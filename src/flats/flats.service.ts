import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Flat } from './flats.model';
import mongoose, { PipelineStage, Query } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FilterFlat } from './filter.model';
import { FlatCreate } from './dto/flat-create';
import { FlatUpdate } from './dto/flat-update';
import { NotFoundError } from 'rxjs';

@Injectable()
export class FlatsService {
    maxItemPage:number;
    constructor(
        @InjectModel(Flat.name)    
        private flatModel: mongoose.Model<Flat>,) {
        this.maxItemPage = 12    
    }
    async getAll(query:any):Promise<Flat[]>{
        try{
            const currentPage:any = query.numberPage || 1
            const skip = this.maxItemPage * (currentPage - 1)               
            return await this.flatModel.find().limit(this.maxItemPage).skip(skip);         
            
        }
        catch{
            throw new InternalServerErrorException 
        }  
    }  
    async getByParams(query:FilterFlat):Promise<Flat[]>{
        try{
            const currentPage:any = query.numberPage || 1
            const skip = this.maxItemPage * (currentPage - 1)
               
            let response =  await this.flatModel.aggregate(
                [
                this.getAgregationProject(),
                {
                    $match:{
                        area:{
                        $gte:query.areaMin,
                        $lte:query.areaMax,  
                        },
                        prce:{
                          $gte:query.priceMin,
                          $lte:query.priceMax,
                        },
                        rooms:query.rooms,
                        floor:{
                          $gte:query.floorMin,
                          $lte:query.floorMax
                        }
                      }
                }                  
                ]
            ).limit(this.maxItemPage).skip(skip)
            if(query.sortByArea){
                FilterFlat.sortingByArea(response)
            };
            if(query.sortByPrice){
                FilterFlat.sortingByPrice(response)
            }
            return response;
        }
        catch{
            throw new InternalServerErrorException 
        }  
    }  
    async setFlat(flat:FlatCreate):Promise<FlatCreate> {
        flat._id = new mongoose.Types.ObjectId()
        flat.pricePerMeter = this.round(Number.parseInt((flat.prce).toString()) / Number.parseInt((flat.area).toString()),2) 
        flat.createdAt = new Date().toISOString();
        flat.updatedAt = new Date().toISOString();
        try{
            await this.flatModel.insertMany(flat)
        }
        catch{
            throw new InternalServerErrorException
        }
        
        return flat;
    }    
    async deleteFlat(query:any):Promise<Flat> {
        
            let id = query.mongoId
            let oldFlat = await (await this.flatModel.findById(new mongoose.Types.ObjectId(id)))
            if(!oldFlat){
                throw new NotFoundException
            }
        try{
            await this.flatModel.deleteOne({_id :oldFlat._id});
            return oldFlat
        }
        catch{
            throw new InternalServerErrorException
        }
                
    }
    async updateFlat(updateFlat:FlatUpdate):Promise<Flat>{
        updateFlat.pricePerMeter = this.round(Number.parseInt((updateFlat.prce).toString()) / Number.parseInt((updateFlat.area).toString()),2) 
        try{
            let oldFlat = await this.flatModel.findById(updateFlat.id);
            if(!oldFlat){
                throw new NotFoundException
            }
           return await this.flatModel.findByIdAndUpdate(updateFlat.id,updateFlat)
        }
        catch{
            throw new InternalServerErrorException
        }
       
        
    }
    async getFilter():Promise<FilterFlat>{
        try{
            let minPrice = (await this.flatModel.aggregate([this.getAgregationProject(),{$sort:{prce:1}},{$project:{_id:0,prce:1}}]).limit(1)).map(function(a){return a.prce})[0]
        let maxPrice = (await this.flatModel.aggregate([this.getAgregationProject(),{$sort:{prce:-1}},{$project:{_id:0,prce:1}}]).limit(1)).map(function(a){return a.prce})[0]
        let minArea = (await this.flatModel.aggregate([this.getAgregationProject(),{$sort:{area:1}},{$project:{_id:0,area:1}}]).limit(1)).map(function(a){return a.area})[0]
        let maxArea = (await this.flatModel.aggregate([this.getAgregationProject(),{$sort:{area:-1}},{$project:{_id:0,area:1}}]).limit(1)).map(function(a){return a.area})[0]
        let minFloor = (await this.flatModel.aggregate([this.getAgregationProject(),{$sort:{floor:1}},{$project:{_id:0,floor:1}}]).limit(1)).map(function(a){return a.floor})[0]
        let maxFloor = (await this.flatModel.aggregate([this.getAgregationProject(),{$sort:{floor:-1}},{$project:{_id:0,floor:1}}]).limit(1)).map(function(a){return a.floor})[0]
        return FilterFlat.fromByParams(minPrice,maxPrice,minArea,maxArea,minFloor,maxFloor)       
        }
        catch{
            throw new InternalServerErrorException 
        }
        
        

    }
    getAgregationProject():PipelineStage{
        return{ 
            $project: {
            _id: 1,
            area:{$toDouble:"$area"},
            prce:{$toDouble:"$prce"},
            number:1,
            rooms:1,
            pricePerMeter:1,
            floor:1,  
          }
        }
    }
    private round(num: number, fractionDigits: number): number {
        return Number(num.toFixed(fractionDigits));
    }

}

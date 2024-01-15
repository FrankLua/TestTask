import { Injectable } from '@nestjs/common';
import { Flat } from './flats.model';
import mongoose, { Query } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { FilterFlat } from './filter.model';

@Injectable()
export class FlatsService {
    maxItemPage:number;
    constructor(
        @InjectModel(Flat.name)    
        private flatModel: mongoose.Model<Flat>,) {
        this.maxItemPage = 12    
    }
    async getAll(query:FilterFlat):Promise<Flat[]>{

        const currentPage:any = query.numberPage || 1
        const skip = this.maxItemPage * (currentPage - 1)
           
        let response =  await this.flatModel.aggregate(
            [
            { 
                $project: {
                _id: 0,
                area:{$toDouble:"$area"},
                prce:{$toDouble:"$prce"},
                number:1,
                rooms:1,
                pricePerMeter:1,
                floor:1,  
              }
            },
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
}

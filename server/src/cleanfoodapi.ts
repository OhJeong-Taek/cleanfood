import { RESTDataSource } from "@apollo/datasource-rest";
import { parseStringPromise } from 'xml2js'

export default class CleanFoodAPI extends RESTDataSource {
    override baseURL = "https://openapi.foodsafetykorea.go.kr/api/";
    
    async getDirtyFoodCompList(id: string){
      const response = await this.get(`${process.env.FoodSafetyGOVENV}/I1850/xml/0/1000/CHNG_DT=20220629`);
      const result = await parseStringPromise(response);
      return result.I1850.row.map((post: any) => this.getDirtyFoodCompReducer(post));
    }

    getDirtyFoodCompReducer(post: any){
      return {
        id: post.$.id,
        name: post.ENTRPS_NM[0],
        expire_date: post.PUBLC_BGN_DT[0],
        details: post.VILT_DTLS[0],
        address: post.ENTRPS_BASS_ADDR[0],
        business_type: post.BSN_KND_NM[0],
      }
    }
  }
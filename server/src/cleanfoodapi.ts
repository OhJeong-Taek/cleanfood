import { RESTDataSource } from "@apollo/datasource-rest";


export default class CleanFoodAPI extends RESTDataSource {
    override baseURL = "https://openapi.foodsafetykorea.go.kr/api/";
    
    async getDirtyFoodCompList(id: string){
      const response = await this.get(`${process.env.FoodSafetyGOVENV}/I1850/xml/0/1000/CHNG_DT=20220629`);
      return this.getDirtyFoodCompReducer(response)
    }

    getDirtyFoodCompReducer(post: any){
      post = post.I1850.row;
      return {
        name: post.ENTRPS_NM,
        expire_date: post.PUBLC_BGN_DT,
        details: post.VILT_DTLS,
        address: post.ENTRPS_BASS_ADDR,
        business_type: post.BSN_KND_NM,
      }
    }
  }
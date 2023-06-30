import { RESTDataSource } from "@apollo/datasource-rest";


export default class CleanFoodAPI extends RESTDataSource {
    override baseURL = `https://openapi.foodsafetykorea.go.kr/api`;
    
    async getDirtyFoodCompList(id: string){
      console.log(process.env.FoodSafetyGOVENV)
      console.log('here')
      return this.get(`/${process.env.FoodSafetyGOVENV}/I1850/xml/0/1000/CHNG_DT=20220629`);
    }

  }
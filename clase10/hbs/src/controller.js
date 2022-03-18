 const Controller ={
    array : [],
     createProduct(prod){
      try {
        if(this.array.length>0){
            this.array.push({...prod,id:this.array.length+1})
           }else{
               this.array.push({...prod,id:1})
           }

           return 1
      } catch (error) {
          console.log(error)
            return 0
      }
    },

    getProduct(id){
        return this.array.filter(prod=>prod.id==id)
    },

    getProducts(){
        return this.array
    },
    deleteProduct(id){
      
        if((this.array.filter(prod=>prod.id==id).length >0)){
           
            this.array=this.array.filter(prod=>prod.id!=id)
            return 1
        }else{
            return 0
        }
       
    },

    updateProduct(id,prod){
       
        if((this.array.filter(prod=>prod.id==id).length >0)){
           
            this.array=this.array.map(p=>p.id==id?{
                ...prod

                
            }:p)
            return 1
        }else{
            return 0
        }
    }
}

module.exports = Controller;
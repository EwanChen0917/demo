import { 
    doubleTransformer, 
    tagSubTransformer, 
    tagTransformer, 
    cascaderTransformer, 
    postCodeTransformer,
    phoneTransformer,
} from "./transformer"

const fieldRegister = {
    'tag': tagTransformer,
    'tagSub': tagSubTransformer,
    'double': doubleTransformer,
    'cascader': cascaderTransformer,
    'postcode': postCodeTransformer,
    'phone':phoneTransformer,
}
//提取转换器的注册函数
export function getTransFormer(fieldType:string){
    if(fieldRegister[fieldType]){
        return fieldRegister[fieldType]
    }
    return {
        toSubmit:(data)=>{
            return data
        },
        toView:(data)=>data
    }
    
}
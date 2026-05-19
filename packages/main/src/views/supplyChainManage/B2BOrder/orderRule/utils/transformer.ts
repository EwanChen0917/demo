//基于tag类型的转换器
export const tagTransformer = {
    toSubmit:(rightSide:any[])=>{
        if(!rightSide || !Array.isArray(rightSide)) return []
        return rightSide.map(item=>{
            if(typeof item === 'string') return {
                value:item,
                desc:item
            }
            return {
                value:item.value,
                desc:item?.desc || item?.value || ''
            }
        }).filter(item=>item.value)
    },
    toView:(rightSide:any[])=>{
        if(!rightSide || !Array.isArray(rightSide)) return []
        return rightSide.map(item=>{
            if(typeof item === 'string') return item;
            return item?.value || item;
        }).filter(Boolean)
    }
}
export const tagSubTransformer = {
    toSubmit:(rightSide:any[])=>{
        if(!rightSide || !Array.isArray(rightSide)) return []
        return rightSide.map(item=>{
            if(typeof item === 'string') return {
                value:item,
                subOp:item
            }
        })
    },
    toView:(rightSide:any[])=>{
        if(!rightSide || !Array.isArray(rightSide)) return []
        return rightSide.map(item=>{
            if(typeof item === 'string') return item;
            return item?.value || item;
        }).filter(Boolean)
    }
}
//基于double类型的转换器
export const doubleTransformer = {
    toSubmit:(rightSide:any[])=>{
        return rightSide
    },
    toView:(rightSide:any[])=>{
        return rightSide
    },
}
//基于exist类型的转换器
export const existTransformer = {
    toSubmit:(rightSide:any[])=>{
       
    },
    toView:()=>{

    }
}
//基于cascader类型的转换器，剔除掉了后端返回的无用subop字段，如果需要可以自己添加
export const cascaderTransformer = {
    toSubmit:(rightSide:any[])=>{
       if(!rightSide || !Array.isArray(rightSide)) return []
       return rightSide.map(item=>{
            return {
                desc:item.label,
                value:item.value
            }
       })
    },
    toView:(rightSide)=>{
        if(!rightSide || !Array.isArray(rightSide)) return []
        return rightSide.map(item=>{
            return {
                label:item.desc || item.value,
                value:item.value,
            }
        }).filter(Boolean)
    }
}
export const postCodeTransformer = {
    toSubmit: (rightSides: any[]) => {
        if (!rightSides || !Array.isArray(rightSides)) return []
        // 直接返回 rightSides 中有数据的对象
        return rightSides.filter(item => {
            // 过滤掉空数据
            if (!item.rightSides || !Array.isArray(item.rightSides)) return false
            return item.rightSides.some((rs: any) => rs.value)
        })
    },
    toView: (rightSides: any[]) => {
        if (!rightSides || !Array.isArray(rightSides)) return []
        return rightSides
    }
}
//基于手机号的转换器
export const phoneTransformer = {
    toSubmit:(rightSides:any[])=>{
        if (!rightSides || !Array.isArray(rightSides)) return []
        return rightSides
    },
    toView:(rightSides:any[])=>{
        if (!rightSides || !Array.isArray(rightSides)) return []
        return rightSides
    }
}
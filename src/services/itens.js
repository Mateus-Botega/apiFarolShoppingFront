import { http } from './config'

export default {
     
   listar:() => {
        return http.get('/itens')
    },

    salvar: (item) => {
       return http.post('item', item)
   },
    
    atualizar: (item) => {
       return http.put('item', item)
   },
    
	apagar:(item)=>{
		return http.delete('item', { data: item })
	}
}
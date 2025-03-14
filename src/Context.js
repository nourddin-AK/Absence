import { useContext,useState,createContext } from "react";
const TableContext = createContext();
export function TableProvider ({children}){
    const [selectedItem,setSelectedItem] = useState(null)
    const [activeModal,setActiveModal] = useState(null)
    return <TableContext.Provider value={{selectedItem,setSelectedItem,activeModal,setActiveModal}}>
        {children}
    </TableContext.Provider>


}

export function useTableContext (){
    return useContext(TableContext);
}
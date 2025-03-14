import { Moon, SquareArrowOutUpRight, Sun, User,LogOut } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
function Header({theme,setTheme}){
  const [menu,setMenu] = useState(false)
  const style = {
    active :"bg-purple-400 text-purple-700 dark:text-purple-700 dark:bg-purple-300 hover:bg-purple-500 dark:hover:bg-purple-400",
    general : "p-2 flex-1 flex justify-center items-center ",
    hover : "hover:bg-gray-100 dark:hover:bg-gray-600"
  }
  const changeMode = (type)=>{
    setTheme(type)
    setMenu(false);
  }
    return (
      <div className="flex justify-between items-center mb-4 pb-4 border-b dark:border-b-gray-50">
        <h1 className="text-lg font-bold text-gray-700 dark:text-gray-50">Overview</h1>
        <div className="relative">
              <div className="flex items-center gap-4" onClick={()=>setMenu(!menu)}>
                  <button className="flex items-center gap-2 cursor-pointer">
                    <div className="size-8 bg-slate-200 text-slate-900 rounded-full flex items-center justify-center">
                            <User size={20}/>
                    </div>
                    <div className="flex items-center gap-2">
                              <div className="text-xs font-bold text-gray-700 dark:text-gray-50">Adam Taylor</div>
                    </div>
                  </button>
              </div>
              {
                menu && 
                <div className=" space-y-2 p-2 absolute z-50 w-32 bg-slate-50 border -right-3 top-9 rounded-md text-gray-700 dark:text-gray-50 dark:bg-gray-700">
                    <Link to ='/adminProfile' className="flex text-sm rounded-md items-center justify-between w-full p-2 hover:bg-gray-100  dark:hover:bg-gray-600  font-semibold " onClick={()=>setMenu(false)}>
                         Profile 
                         <SquareArrowOutUpRight size={16}/>
                    </Link>
                    <div className="flex items-center  border rounded-md  ">
                      <button className={`${style.general} rounded-l-md  ${theme === 'light' ? style.active : style.hover}` } onClick={()=>changeMode('light')}><Sun size={16}/></button>
                      <button className={`${style.general} rounded-r-md ${theme === 'dark' ? style.active : style.hover}` } onClick={()=>changeMode('dark')}><Moon size={16}/></button>
                    </div>
                    <button className="flex text-sm items-center justify-between p-2 rounded-md  w-full hover:bg-red-50 dark:hover:bg-red-200  text-red-600 font-semibold " onClick={()=>setMenu(false)}>
                          <span >Logo out</span>
                          <LogOut size={16} />

                    </button>

                </div>
              }

        </div>

      </div>
    )
}
export default Header
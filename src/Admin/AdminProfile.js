import { useState } from "react"
import ChangePassword from "./ChangePassword";
import {style,errorsMsgs} from '../Users'
// import ErrorMsg from "../LittleComponents/ErrorMsg";
const names = ['matricule','name','age']
export default function AdminProfile(){
   const [section,setSection] = useState('generalInfo')
   const admin = {
      matricule : 'M123456',
      name: 'Ahmed Jalaoui',
      age: 40,
      gender:'Male',
      role:'Admin',

   }

  

     const [formData,setFormData] = useState(admin)
     const [errors,setErrors]= useState({})

     const handleChange = (e)=>{
        const {name,value}= e.target
        setFormData(prev=> ({...prev,[name]:value}))
      
        
        
     }
     const InFocus = (e)=>{
       const {name} = e.target
        const updetedErros = {...errors}
        delete updetedErros[name]
        console.log(updetedErros);
        
        setErrors(updetedErros)
        
        
     }

     const handleError=()=>{
        const failures= {}
        names.forEach(name => {
         if (!formData[name]) failures[name] = errorsMsgs[name]
         
       });
        
     
       
        return failures
        
     }
     const handleSubmit = (e)=>{
        e.preventDefault()
        const validation = handleError()
    
        
        console.log(formData,Object.keys(validation));
        
        if (Object.keys(validation).length){
            setErrors(validation)
            return false
        }
       console.log(formData)
        
       
        
        
        
     }
   const activeStyle = 'border-b-purple-600 text-purple-600';
   const desactiveStyle = 'border-b-gray-200 text-gray-200 dark:border-b-gray-600 dark:text-gray-600'

    return (
       <div className=" select-none">
          <h1 className="my-4 mb-20 ml-2 text-gray-700 dark:text-gray-50 font-semibold text-lg">Welcome to your Profile</h1>
          <div className="flex items-center justify-center gap-1 mb-4">
           <button onClick={()=>setSection('generalInfo')} className={`  border-b-2  px-3 py-1     ${section === 'generalInfo' ? activeStyle : desactiveStyle}`}>General Info</button>
           <button onClick={()=>setSection('password')}  className={`   border-b-2 px-3 py-1  ${section === 'password' ? activeStyle : desactiveStyle}`}>Password</button>
           </div>

         
         {
            section === 'generalInfo' ?
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
                  {/* matricule input */}
                  <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border ${style.label} ${errors.matricule ? style.errorBorder : style.border} basis-1/2`}>Matricule</label>
                     <input 
                        type="text" 
                        name="matricule" 
                        defaultValue={formData.matricule} 
                        className={`rounded-r-md px-3 border border-l-0 py-2  disabled:cursor-not-allowed outline-none ${style.input} ${errors.matricule ? style.errorBorder : style.border} ${style.focusInput}`} 
                        placeholder="Enter your matricule" 
                        onChange={handleChange} 
                        onFocus={InFocus}
                     />
                  </div>
                  {/* <ErrorMsg value={errors.matricule}/> */}
                  {/* full name input */}
                  <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border  basis-1/2 ${style.label} ${errors.name ? style.errorBorder : style.border} `}>Full Name</label>
                     <input 
                        type="text" 
                        name="name" 
                        defaultValue={formData.name} 
                        className={`rounded-r-md px-3 border border-l-0 py-2   outline-none ${style.input} ${errors.name ? style.errorBorder : style.border} ${style.focusInput} `} 
                        placeholder={`Enter your full name`} 
                        onChange={handleChange} 
                        onFocus={InFocus}

                     />
                  </div>
                  {/* <ErrorMsg value={errors.name}/> */}
                  {/* age input */}
                  <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border basis-1/2 ${style.label} ${errors.age ? style.errorBorder : style.border}`}>Age</label>
                     <input 
                        type="number" 
                        name="age" 
                        defaultValue={formData.age} 
                        className={`rounded-r-md px-3 border border-l-0 py-2 outline-none ${style.input} ${errors.age ? style.errorBorder : style.border}  ${style.focusInput}`} 
                        placeholder={`Enter your age`} 
                        onChange={handleChange} 
                        onFocus={InFocus}

                      />
                  </div>
                  {/* <ErrorMsg value={errors.age}/> */}
                  {/* gender input */}
                  <div class="flex my-3 w-full">
                     <label  className={`px-3 py-2  rounded-l-md border ${style.label}  ${errors.gender ? style.errorBorder : style.border} basis-1/2 max-w-[178px] `}>Gender </label>
                     <div className={`flex gap-4 border ${style.input}  ${errors.gender ? style.errorBorder : style.border} rounded-r-md px-3 border border-l-0 py-2  flex-1`}>
                        <div className="flex items-center  gap-1">
                           
                           <input 
                              type="radio" 
                              name="gender" 
                              value={'Male'} 
                              defaultChecked={formData.gender === 'Male'}   
                              className="    accent-purple-400 cursor-pointer"  
                              onChange={handleChange} 
                           />
                           <label  className=" mb-1 text-sm font-medium text-gray-700 dark:text-gray-50">Male </label>
                        </div>
                        <div class="flex items-center  gap-1">
                           
                           <input 
                              type="radio" 
                              name="gender" 
                              value={'Female'} 
                              defaultChecked={formData.gender === 'Female'}   
                              className="  accent-purple-400 cursor-pointer" 
                              onChange={handleChange}  
                           />
                           <label  className=" mb-1 text-sm font-medium text-gray-700 dark:text-gray-50">Female </label>
                        </div>
                        
                  
                     </div>
         
                  </div>
                  {/* role input */}
                  <div className="flex my-2 w-full">
                     <label className={`px-3 py-2  rounded-l-md border basis-1/2 ${style.label} ${style.border}`}>Role</label>
                     <input 
                        type="text" 
                        name="role" 
                        defaultValue={formData.role} 
                        className={`rounded-r-md px-3 border border-l-0 py-2  disabled:cursor-not-allowed ${style.input} ${style.border} ${style.disabledInput}`} 
                        disabled

                     />
                  </div>
                  <button 
                     type="submit"  
                     className="text-blue-800 bg-blue-200 hover:bg-blue-400 dark:text-gray-50 dark:bg-blue-700 dark:hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-1/3 mt-5 float-end px-5 py-2.5 text-center " 
                  > 
                     Save
                  </button>
            </form>
            :
           <ChangePassword user={admin}/>
         }
          
       </div>
    )
}
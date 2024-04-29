import React, { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// import { ToastContainer, toast } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';
import { useRef, useState } from 'react'

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])
  useEffect(() => {
    let password = localStorage.getItem('password');
    let passwordArray;
    if (password) {
      setpasswordArray(JSON.parse(password))
    }
    else {
      passwordArray = []
    }
  }, [])


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }
  const savePassword = () => {
    if(form.site.length >3 && form.username.length >3 && form.password.length >3){
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      localStorage.setItem('password', JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
      console.log([...passwordArray, form])
    }
    else {
      alert('please enter valid inputs!')
    }
  }
  const deletePassword = (id) => {
    let c = confirm('Are you sure you want to delete?')
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id != id))
      localStorage.setItem('password', JSON.stringify(passwordArray.filter(item => item.id != id)))
    }

  }
  const editpassword = (id) => {
    setpasswordArray(passwordArray.filter(item => item.id != id))
    setform(passwordArray.filter(i => i.id == id)[0])
    localStorage.setItem('password', JSON.stringify(passwordArray.filter(item => item.id != id)))
  }

  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/hide.png")) {
      ref.current.src = "icons/visible.png"
      passwordRef.current.type = "password"
    }
    else {
      ref.current.src = "icons/hide.png"
      passwordRef.current.type = "text"
    }
  }
  return (
    <>
      <div className='bg-gradient-to-r from-indigo-600 via-rose-300 to-amber-300 h-screen '>
        <div className="container mx-auto max-w-4xl">
          <div className='flex flex-col items-center  p-4 gap-4'>
            <input value={form.site} placeholder='Enter url' className='rounded-lg w-full border-rose-300 p-4 py-1' name="site" type="text" onChange={handleChange} />
            <div className='flex flex-col md:flex-row w-full justify-between gap-8'>
              <input value={form.username} placeholder='Enter Username' className='rounded-lg w-full border-rose-300 border p-4 py-1 ' name="username" type="text" onChange={handleChange} />
              <div className='relative'>
                <input ref={passwordRef} value={form.password} placeholder='Enter Password' className='rounded-lg w-full border-rose-300 p-4 py-1' name="password" type="password" onChange={handleChange} />
                <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                  <img ref={ref} className='p-1' width={26} src="icons/visible.png" alt="" />
                </span>
              </div>
            </div>
            <button onClick={savePassword} className='border-2 px-4 py-1 gap-2 flex justify-center items-center text-white w-fit font-bold border-white rounded-lg bg-gradient-to-r from-indigo-700 via-rose-400 to-amber-400 
        hover:from-indigo-500 hover:via-rose-300 hover:to-amber-300'>
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
                colors="primary:#ffffff">
              </lord-icon>Add</button>
          </div>
          <div className="passwords">
            <h2 className='text-white font-bold p-2'>your passwords :</h2>
            {passwordArray.length === 0 && <div className='text-white text-center'>no passwords to show!</div>}
            {passwordArray.length != 0 && <table className=" table-auto w-full mb-2 text-white rounded-lg overflow-hidden shadow-md ">
              <thead className='shadow-lg bg-gradient-to-r from-indigo-700 via-rose-400 to-amber-400'>
                <tr>
                  <th className='py-2'>URL</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className='py-2 text-center w-32'><a href={item.site} target='_blank'>{item.site}</a></td>
                    <td className='py-2 text-center w-32'>{item.username}</td>
                    <td className='py-2 text-center w-32'>{item.password}</td>
                    <td className='py-2 text-center w-32'>
                      <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}><lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover"
                        colors="primary:#ffffff">
                      </lord-icon></span>
                      <span className='cursor-pointer mx-1' onClick={() => { editpassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/wuvorxbv.json"
                          trigger="hover"
                          colors="primary:#ffffff,secondary:#8930e8">
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Manager

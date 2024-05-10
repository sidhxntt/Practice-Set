import {createBrowserRouter} from 'react-router-dom'
import Home from '../Home/Home'
import Example1 from '../Example1/Example1'
import Example2 from '../Example2/Example2'
import Example3 from '../Example3/Example3'
import Example4 from '../Example4/Example4'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/example-1',
    element:<Example1/>
  },
  {
    path:'/example-2',
    element:<Example2/>
  },
  {
    path:'/example-3',
    element:<Example3/>
  },
  {
    path:'/example-4',
    element:<Example4/>
  },
])

export default router
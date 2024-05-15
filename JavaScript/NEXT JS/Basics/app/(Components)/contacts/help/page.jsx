'use client'
import { useRouter } from 'next/navigation'
const page = () => {
  const router = useRouter()
  return (
    <>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus
      possimus iure nostrum, id sunt eveniet quasi accusamus eaque beatae ad vel
      earum quia quis architecto sint quisquam dicta iusto, vitae expedita culpa
      facere autem temporibus voluptate! Iusto nisi commodi dolorem perferendis
      saepe laborum, nemo eum sit repudiandae perspiciatis suscipit voluptatum
      fuga corporis vel modi quasi minus harum consectetur dolorum tenetur
      sapiente beatae optio eius! Libero mollitia ea harum iste necessitatibus,
      veritatis, modi optio ad omnis expedita delectus animi laborum veniam
      quibusdam cupiditate culpa quae vitae tempore doloremque, nesciunt rem
      odit accusantium ipsum! Quo voluptate quibusdam eveniet reiciendis id,
      facere dignissimos!
    </p>
    <button onClick={()=>{router.push('/contacts')}}>Click</button>
    </>
    
    
  );
};

export default page;

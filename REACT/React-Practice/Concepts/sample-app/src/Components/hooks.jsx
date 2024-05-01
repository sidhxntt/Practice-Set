import { useEffect } from "react";
//useEffect will only run when re-render will happen due change of component's state.

const hooks_samples = (count) => {
    //Case 1: It will run only on the first render ie  when the component is mounted in the DOM for the first time
  useEffect(() => {
    alert("Running only for the first time");
  }, []);
    //Case 2: It will run on any render ie when any component's state is changed anywhere.
    useEffect(() => {
    alert("Running whenever anything changes");
  });
    //Case 3: It will run only the rendering of the array parameter ie count in this case 
    useEffect(() => {
    alert("Running whenver count changes");
  }, [count]);
};

export default hooks_samples;
//usually used for background processes such as authentication, authourisation, fetching etc
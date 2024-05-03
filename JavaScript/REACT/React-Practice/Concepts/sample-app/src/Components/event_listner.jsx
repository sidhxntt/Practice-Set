import React, { useEffect, useState } from "react";

const EventListener = () => {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [Name, setName] = useState('Sid');
  const [form, setForm] = useState({ name: "", phone: "" });

  const handlechange = (e) => {
    setName(e.target.value);
  };

  const handleformchange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isRunning) {
      const timeout = setTimeout(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);

      // Cleanup function to clear timeout on component unmount or when isRunning becomes false
      return () => clearTimeout(timeout);
    }
  }, [count, isRunning]);

  const startcounter = () => {
    setIsRunning(true);
  };
  const stopcounter = () => {
    setIsRunning(false);
  };

  return (
    <div>
      <button onClick={startcounter}>Start Counter</button>
      <button onClick={stopcounter}>Stop Counter</button>
      <p>Counter: {count}</p>
      <input type="text" value={Name} onChange={handlechange} placeholder="Name" />
      <div>
        <input type="text" name="name" value={form.name} onChange={handleformchange} placeholder="Form Name" />
        <input type="type" name="phone" value={form.phone} onChange={handleformchange} placeholder="Form Number" />
      </div>
    </div>
  );
};

export default EventListener;

import React, { useState, useRef } from "react";

const App = () => {
  const [darkmode, setDarkmode] = useState(false);
  const paraRef = useRef();
  
  const togglemode = () => {
    setDarkmode(!darkmode);
    if (darkmode) {
      document.body.style.backgroundColor = "black";
      paraRef.current.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      paraRef.current.style.color = "black";
    }
  };

  return (
    <div>
      <button onClick={togglemode}>
        {darkmode ? "Light Mode" : "Dark Mode"}
      </button>
      <div ref={paraRef}>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
          distinctio similique minima velit repudiandae sequi eligendi cumque
          corrupti magnam commodi, accusamus ducimus, laudantium recusandae
          molestiae temporibus tempore. Iure, eius. Deleniti corrupti omnis
          voluptate officia reprehenderit at, amet, dolores obcaecati velit a
          soluta harum assumenda dolore deserunt! Fuga vel sapiente asperiores
          accusantium quam autem exercitationem, magni nulla ut rerum rem sint
          ipsa ratione! Quas nulla itaque excepturi similique ipsam consectetur?
          Eligendi nam iusto, optio dicta voluptates, id nesciunt repellendus
          itaque fugiat doloremque aut sit ea necessitatibus. Veritatis incidunt
          possimus officiis, ipsa nemo debitis odio ad sed laboriosam earum
          doloribus porro sint iste ipsam iure eius, perspiciatis in quas? Sit
          explicabo numquam excepturi voluptatibus, ratione aliquam modi aperiam
          ea vitae, corporis voluptate. Dolores voluptatibus doloribus voluptate
          inventore repellat minima quia laborum, sed voluptas. Temporibus minus
          soluta vel similique ullam alias, placeat non quaerat sequi magni quas
          quod commodi voluptates omnis ipsam quo quia perferendis, atque eaque
          autem voluptatibus molestiae dignissimos facere. Rem, deleniti? Nam
          iusto eos similique quisquam illo facere ex temporibus autem quos
          veniam, provident a esse est voluptatem atque cupiditate, vero
          voluptates praesentium maxime iste voluptas. Praesentium, nulla
          provident, deleniti doloremque, ipsum accusamus saepe dicta rem error
          ipsam sunt suscipit neque similique numquam. Rerum voluptas quam
          nostrum quibusdam deleniti odit adipisci totam aliquid quidem, dolorem
          sequi voluptates vero repellat nisi ex, odio quia dolore! Consequatur,
          qui quos. Accusantium ab minus et sint excepturi quas iure nemo.
          Molestiae illum ullam atque nisi fugiat, aliquid optio vero harum
          labore sunt in deleniti itaque odio! Hic corrupti exercitationem quam
          a unde vel officiis? Fugiat eveniet sapiente ratione molestias, odit
          voluptate sint nihil ipsam fugit! Officiis distinctio dolores expedita
          reprehenderit natus. Quibusdam blanditiis officia modi earum sunt
          cupiditate delectus perferendis, assumenda excepturi eligendi facilis
          minima porro quisquam molestiae molestias deserunt tenetur hic sint
          repellendus eaque accusantium doloremque dolore enim. Sapiente a,
          molestiae, optio quaerat dolorum corrupti fugiat vitae in perferendis
          voluptatum totam ex laudantium velit. Molestias soluta, suscipit autem
          deserunt minima eius omnis placeat illo nulla quasi hic officiis
          veniam, maiores fugit laboriosam laborum earum aspernatur harum,
          perferendis optio molestiae consectetur nisi voluptatem. Illo nihil
          nostrum dolores perferendis quam sunt ipsum inventore sint! Ad
          molestiae facere odio repellat tempore eum ipsa dolore, id dolores
          earum eveniet ea iusto excepturi, dolorem vero iste consectetur
          aperiam pariatur! Incidunt quisquam repellendus non a, perspiciatis
          sapiente libero consectetur reprehenderit pariatur quasi hic quaerat
          magnam nesciunt repellat voluptates asperiores eius ipsum. Minima,
          nostrum labore fugiat iure nesciunt asperiores iusto laboriosam
          reprehenderit quos quas fugit repudiandae nulla quis incidunt
          praesentium beatae dolores facere placeat at vitae nisi. Ipsam natus
          voluptatum tempora accusantium ex nesciunt quidem ipsa iusto porro
          cupiditate quam necessitatibus ullam consectetur placeat corporis
          perferendis delectus doloribus, vitae obcaecati? Pariatur magni
          exercitationem eum fugiat nam explicabo, mollitia architecto facilis,
          molestias animi saepe recusandae sed! Rem quibusdam assumenda cum.
          Dicta odit soluta sit iure corrupti porro libero minus labore,
          consectetur veniam debitis voluptates quisquam repellat enim magnam
          fuga animi accusamus voluptas? Nesciunt obcaecati ducimus atque
          perspiciatis modi dolore, aliquid amet!
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
          distinctio similique minima velit repudiandae sequi eligendi cumque
          corrupti magnam commodi, accusamus ducimus, laudantium recusandae
          molestiae temporibus tempore. Iure, eius. Deleniti corrupti omnis
          voluptate officia reprehenderit at, amet, dolores obcaecati velit a
          soluta harum assumenda dolore deserunt! Fuga vel sapiente asperiores
          accusantium quam autem exercitationem, magni nulla ut rerum rem sint
          ipsa ratione! Quas nulla itaque excepturi similique ipsam consectetur?
          Eligendi nam iusto, optio dicta voluptates, id nesciunt repellendus
          itaque fugiat doloremque aut sit ea necessitatibus. Veritatis incidunt
          possimus officiis, ipsa nemo debitis odio ad sed laboriosam earum
          doloribus porro sint iste ipsam iure eius, perspiciatis in quas? Sit
          explicabo numquam excepturi voluptatibus, ratione aliquam modi aperiam
          ea vitae, corporis voluptate. Dolores voluptatibus doloribus voluptate
          inventore repellat minima quia laborum, sed voluptas. Temporibus minus
          soluta vel similique ullam alias, placeat non quaerat sequi magni quas
          quod commodi voluptates omnis ipsam quo quia perferendis, atque eaque
          autem voluptatibus molestiae dignissimos facere. Rem, deleniti? Nam
          iusto eos similique quisquam illo facere ex temporibus autem quos
          veniam, provident a esse est voluptatem atque cupiditate, vero
          voluptates praesentium maxime iste voluptas. Praesentium, nulla
          provident, deleniti doloremque, ipsum accusamus saepe dicta rem error
          ipsam sunt suscipit neque similique numquam. Rerum voluptas quam
          nostrum quibusdam deleniti odit adipisci totam aliquid quidem, dolorem
          sequi voluptates vero repellat nisi ex, odio quia dolore! Consequatur,
          qui quos. Accusantium ab minus et sint excepturi quas iure nemo.
          Molestiae illum ullam atque nisi fugiat, aliquid optio vero harum
          labore sunt in deleniti itaque odio! Hic corrupti exercitationem quam
          a unde vel officiis? Fugiat eveniet sapiente ratione molestias, odit
          voluptate sint nihil ipsam fugit! Officiis distinctio dolores expedita
          reprehenderit natus. Quibusdam blanditiis officia modi earum sunt
          cupiditate delectus perferendis, assumenda excepturi eligendi facilis
          minima porro quisquam molestiae molestias deserunt tenetur hic sint
          repellendus eaque accusantium doloremque dolore enim. Sapiente a,
          molestiae, optio quaerat dolorum corrupti fugiat vitae in perferendis
          voluptatum totam ex laudantium velit. Molestias soluta, suscipit autem
          deserunt minima eius omnis placeat illo nulla quasi hic officiis
          veniam, maiores fugit laboriosam laborum earum aspernatur harum,
          perferendis optio molestiae consectetur nisi voluptatem. Illo nihil
          nostrum dolores perferendis quam sunt ipsum inventore sint! Ad
          molestiae facere odio repellat tempore eum ipsa dolore, id dolores
          earum eveniet ea iusto excepturi, dolorem vero iste consectetur
          aperiam pariatur! Incidunt quisquam repellendus non a, perspiciatis
          sapiente libero consectetur reprehenderit pariatur quasi hic quaerat
          magnam nesciunt repellat voluptates asperiores eius ipsum. Minima,
          nostrum labore fugiat iure nesciunt asperiores iusto laboriosam
          reprehenderit quos quas fugit repudiandae nulla quis incidunt
          praesentium beatae dolores facere placeat at vitae nisi. Ipsam natus
          voluptatum tempora accusantium ex nesciunt quidem ipsa iusto porro
          cupiditate quam necessitatibus ullam consectetur placeat corporis
          perferendis delectus doloribus, vitae obcaecati? Pariatur magni
          exercitationem eum fugiat nam explicabo, mollitia architecto facilis,
          molestias animi saepe recusandae sed! Rem quibusdam assumenda cum.
          Dicta odit soluta sit iure corrupti porro libero minus labore,
          consectetur veniam debitis voluptates quisquam repellat enim magnam
          fuga animi accusamus voluptas? Nesciunt obcaecati ducimus atque
          perspiciatis modi dolore, aliquid amet!
        </p>
      </div>
    </div>
  );
};

export default App;

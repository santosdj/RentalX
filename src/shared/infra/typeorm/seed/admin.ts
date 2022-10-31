import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
  const id = uuidV4();
  const password = await hash("admin", 8);

  const connection = await createConnection("localhost");

  const query = `INSERT INTO USERS(id, name, email, password, "isAdmin" , created_at, driver_license)
                VALUES('${id}', 'admin', 'admin@rentx.com.br' , '${password}', true, 'now()', 'XXXX')`;

  await connection.query(query);
  connection.close();
}

create().then(() => console.log("Admin user created"));

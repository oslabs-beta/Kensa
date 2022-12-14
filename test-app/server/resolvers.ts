export const resolvers = {
  Query: {
    projects: async (_: any, __: any, { db }: any) => {
      const result = await db.query('SELECT * FROM projects;');
      return result.rows;
    },
    project: async (_: any, { id }: any, { db }: any) => {
      const result = await db.query('SELECT * FROM projects WHERE id = $1', [id]);
      return result.rows[0];
    },
    clients: async (_: any, __: any, { db }: any) => {
      const result = await db.query('SELECT * FROM clients;');
      return result.rows;
    },
    client: async (_: any, { id }: any, { db }: any) => {
      const result = await db.query('SELECT * FROM clients WHERE id = $1', [id]);
      return result.rows[0];
    }
  },
  Mutation: {
    addClient: async (_: any, { name, email, phone }: any, { db }: any) => {
      const result = await db.query('INSERT INTO clients(name, email, phone) VALUES($1, $2, $3) RETURNING *', [name, email, phone]);
      return result.rows[0];
    },
    deleteClient: async (_: any, { id }: any, { db }: any) => {
      const result = await db.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    },
    addProject: async (_: any, { name, description, status, client }: any, { db }: any) => {
      const result = await db.query('INSERT INTO projects(name, description, status, client_id) VALUES ($1, $2, $3, $4) RETURNING *', [name, description, status, client]);
      return result.rows[0];
    },
    deleteProject: async (_: any, { id }: any, { db }: any) => {
      const result = await db.query('DELETE FROM projects WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    },
    updateProject: async (_: any, { id, name, description, status }: any, { db }: any) => {
      const result = await db.query('UPDATE projects SET name = $1, description = $2, status = $3 WHERE id = $4 RETURNING *', [name, description, status, id]);
      return result.rows[0];
    }
  },
  Project: {
    client: async ({ client_id }: any, __: any, { db }: any) => {
      const result = await db.query('SELECT * FROM clients WHERE id = $1;', [client_id]);
      return result.rows[0];
    }
  }
};
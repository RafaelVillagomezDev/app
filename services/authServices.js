

const createUser = () => {
    const query='INSERT INTO USUARIO (Email, Id_roluser, Name_user, Surname, password) VALUES (?, ?,?,?,?);'
    return query;
};

module.exports={createUser}
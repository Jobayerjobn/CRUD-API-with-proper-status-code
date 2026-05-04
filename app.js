import express from 'express';

const app = express();
app.use(express.json());

const dataBase = [
    {name: 'Jobayer', email: 'jobayerjoban0048@gmail.com', id: 1},
    {name: 'Joban', email: 'Joban00@gmail.com', id: 2},
    {name: 'Rahim', email: 'rahim@gmail.com', id: 3},
    {name: 'Karim', email: 'karim@gmail.com', id: 4}
]
//GET all users

app.get('/api/v1/users', (req, res, next) => {
    if(dataBase.length === 0){
        return res.status(404).json({
            success: false,
            message: 'Not Found',

        });
    };

    res.json({
        success: true,
        message: dataBase,

    });
});

//GET single users

app.get('/api/v1/users/:id', (req, res , next) => {
    const id = Number(req.params.id);
    const findUser = dataBase.find(user => user.id === id);
    if(!findUser){
        return res.status(404).json({
            success: false,
            message: 'Not Found',
        });
    };

    res.status(200).json({
        success: true,
        data: findUser,

    })
})



//create User 
app.post('/api/v1/users', (req, res, next) => {
    const {name, email} = req.body;
    if(!name || !email) {
        return res.status(400).json({
            success: false,
            message: 'Name and Email are required',

        });
    };
    const existingUser = dataBase.find(e => e.email === email);

    if(existingUser){
       return res.status(409).json({
        success: false,
        message: 'User is existing'
       })
    }
    
    const createUser = {
        name,
        email,
        id: dataBase.length + 1 || Date.now()

    }

    dataBase.push(createUser);
    res.status(201).json({
        success: true,
        data: createUser,
        fullData: dataBase,

    })
})


//Update(full replace)
app.put('/api/v1/users/:id', (req, res, next) => {
    const {name, email} = req.body;
    const id = Number(req.params.id);
    const findIndex = dataBase.findIndex(i => i.id === id);
    console.log(findIndex);
    
    if(findIndex === -1){
        return res.status(204).json();
    };
    dataBase[findIndex] = {
        name,
        email,
        id: id,

    };

    res.status(200).json({
        success: true,
        data: dataBase[findIndex],  
        fullData: dataBase,

    })

})



//Updata partial 
app.patch('/api/v1/users/:id', (req, res, next) => {
    const {name} = req.body;
    const id = Number(req.params.id);
    const findIndex = dataBase.findIndex(i => i.id === id);
    if(findIndex === -1){
        return res.status(204).json();

    };
    /*
    dataBase[findIndex] = {
        name,
        email: dataBase[findIndex].email,
        id: id
    };
    */

    dataBase[findIndex] = {
        ...dataBase[findIndex],
        ...req.body,

    }


    res.status(200).json({
        success: true,
        data: dataBase[findIndex],
        fullData: dataBase,
    })

})


//Delete user
app.delete('/api/v1/users/:id', (req, res, next) => {
    //const {name} = req.body;
    const id = Number(req.params.id);
    const findIndex = dataBase.findIndex(i => i.id === id);
    if(findIndex === -1) {
        return res.status(204).json();
    };

    dataBase.splice(findIndex, 1);
    res.status(200).json({
        success: true,
        message: 'User has been deleted',
        data: dataBase,


    })
})




export default app;
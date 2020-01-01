// import React from 'react';
// import MaterialTable from 'material-table';
// import CustomizedSnackbars from '../snack-bar/SnackBar';

// export default function MaterialTableDemo(props) {

//     const [state, setState] = React.useState({
//         columns: [
//             {title:'Image',field:"render"},
//             { title: 'productName', field: 'productName' },
//             { title: 'BrandName', field: 'brandName' },
//             { title: 'price', field: 'price' },



//         ],
//         data: []


//     });
//     const [open, setOpen] = React.useState({ message: '', open: false });

//     return (
//         <>

//             <MaterialTable
//                 options={{
//                     headerStyle: { backgroundColor: '#212121', color: 'white' }
//                 }}

//                 title="Edit Product"
//                 columns={state.columns}
//                 data={props.data}

//                 editable={{
//                     onRowAdd: newData =>
//                         new Promise(resolve => {

//                             setTimeout(() => {
//                                 if (props.validation(newData)) {
//                                     resolve();
//                                     const data = [...props.data];
//                                     data.push(newData);
//                                     props.setNewdata(data)
//                                 } else {
//                                     props.setNewdata(props.data)
//                                     setOpen({
//                                         open: true,
//                                         message: 'Not updated'
//                                     })
//                                     setTimeout(() => {
//                                         setOpen({
//                                             open: false,
//                                             message: ''
//                                         })
//                                     }, 400);

//                                 }
//                             }, 600);

//                         }),

//                     onRowUpdate: (newData, oldData) =>
//                         new Promise(resolve => {
//                             setTimeout(() => {
//                                 resolve();

//                                 if (props.validation(newData)) {
//                                     const data = [...props.data];
//                                     data[data.indexOf(oldData)] = newData;
//                                     props.setNewdata(data)

//                                 } else {
//                                     setOpen({
//                                         open: true,
//                                         message: 'Not updated'
//                                     })
//                                     setTimeout(() => {
//                                         setOpen({
//                                             open: false,
//                                             message: ''
//                                         })
//                                     }, 1000);
//                                 }
//                             }, 600);
//                         }),
//                     onRowDelete: oldData =>
//                         new Promise(resolve => {
//                             setTimeout(() => {
//                                 resolve();
//                                 const data = [...props.data];
//                                 data.splice(data.indexOf(oldData), 1);
//                                 props.setNewdata(data)

//                             }, 600);
//                         }),
//                 }}
//             />
//             <CustomizedSnackbars message={open.message} open={open.open} status='error' />
//         </>
//     );
// }
import React from 'react';
import MaterialTable from 'material-table';
import CustomizedSnackbars from '../snack-bar/SnackBar';

export default function MaterialTableDemo(props) {
    const [open, setOpen] = React.useState({ message: '', open: false });
    const [state, setState] = React.useState({
        columns: [

            { title: 'productName', field: 'productName' },
            { title: 'BrandName', field: 'brandName' },
            { title: 'price', field: 'price' },
            {title:'Image',field:"render"},

        ],
        data: [],
    });

    return (
        <>
        <MaterialTable
            options={{
                headerStyle: { backgroundColor: '#212121', color: 'white' }
            }}
            title="Editable Example"
            columns={state.columns}
            data={props.data}
            editable={{
                onRowAdd: newData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                if (props.validation(newData)) {
                                const data = [...props.data];
                                data.push(newData);
                                props.setNewdata(data)
                                return { ...prevState, data };
                                }else{
                                    setOpen({
                                        open: true,
                                        message: 'Not updated'
                                    })
                                    setTimeout(() => {
                                        setOpen({
                                            open: false,
                                            message: ''
                                        })
                                    }, 1000);
                                }
                            });
                        }, 600);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            if (props.validation(newData)) {
                                setState(prevState => {
                                    const data = [...props.data];
                                    newData.render=<img style={{height:'50px',width:'100px'}} src={newData.image} alt={newData.id}/>
                                    console.log(newData.render);
                                    
                                    data[data.indexOf(oldData)] = newData;
                                    props.setNewdata(data)
                                    return { ...prevState, data };
                                });
                            } else {
                                setOpen({
                                    open: true,
                                    message: 'Not updated'
                                })
                                setTimeout(() => {
                                    setOpen({
                                        open: false,
                                        message: ''
                                    })
                                }, 1000);
                            }
                        }, 600);
                    }),
                onRowDelete: oldData =>
                    new Promise(resolve => {
                        setTimeout(() => {
                            resolve();
                            setState(prevState => {
                                const data = [...props.data];
                                data.splice(data.indexOf(oldData), 1);
                                props.setNewdata(data)
                                return { ...prevState, data };
                            });
                        }, 600);
                    }),
            }}
        />
            <CustomizedSnackbars message={open.message} open={open.open} status='error' />
</>

    );
}
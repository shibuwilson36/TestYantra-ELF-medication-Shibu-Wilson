import React from 'react'
export default function Profile() {
    let profileData = localStorage.getItem("profile").split(",")
    console.log(profileData);

    return (
        <>
            <div className="container-fluid">
                <div className="col-md-12  mt-3">

                    <div className="col-md-6 offset-md-3 card card-body float-left  ">
                        <h6 className="text-center  text-danger">MY ACCOUNT</h6>

                        <img
                            className="col-md-6 offset-md-3  mt-5"
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                            alt=""
                            width="50%"
                        />
                        <table className="table mt-3">
                            <tr>
                                <td>Name</td>
                                <td>{profileData[0]} {profileData[1]}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{profileData[2]}</td>
                            </tr>
                            <tr>
                                <td>Mobile</td>
                                <td>{profileData[3]}</td>
                            </tr>
                        </table>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

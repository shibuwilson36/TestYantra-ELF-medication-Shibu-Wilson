import React from 'react'

export default function TopHome() {
    return (
        <div>

            <div id="carousel-example-2" class="carousel slide carousel-fade mt-1 mb-5" data-ride="carousel">

                <ol class="carousel-indicators">
                    <li data-target="#carousel-example-2" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-2" data-slide-to="1"></li>
                    <li data-target="#carousel-example-2" data-slide-to="2"></li>
                </ol>


                <div class="carousel-inner container-fluid" role="listbox">
                    <div class="carousel-item active">
                        <div class="view">
                            <img class="d-block w-100" src="https://rukminim1.flixcart.com/flap/844/140/image/05438eeb0ba6ba57.jpg?q=50"
                                alt="First slide" />
                            <div class="mask rgba-black-light"></div>
                        </div>
                        
                    </div>
                    <div class="carousel-item">

                        <div class="view">
                            <img class="d-block w-100" src="https://rukminim1.flixcart.com/flap/844/140/image/6a5841af01414d89.jpg?q=50"
                                alt="Second slide" />
                            <div class="mask rgba-black-strong"></div>
                        </div>
                        
                    </div>
                    <div class="carousel-item">

                        <div class="view">
                            <img class="d-block w-100" src="https://rukminim1.flixcart.com/flap/844/140/image/946b6a8608715abc.jpg?q=50"
                                alt="Third slide" />
                            <div class="mask rgba-black-slight"></div>
                        </div>
                        
                    </div>
                </div>

                <a class="carousel-control-prev" href="#carousel-example-2" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carousel-example-2" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>

            </div>

        </div>
    )
}

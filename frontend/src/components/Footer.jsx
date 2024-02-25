import React from 'react'
import moment from 'moment'
import {FaFacebook} from 'react-icons/fa'

function Footer() {
    return (
        <footer class="footer mt-auto">
            <section class="bg-light py-4 py-md-5 py-xl-8 border-top border-light">
                <div class="container overflow-hidden">
                    <div class="row gy-4 gy-lg-0 justify-content-xl-between">
                        <div class="col-12 col-md-4 col-lg-3 col-xl-2">
                            <div class="widget">
                                <a href="#!">

                                </a>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3 col-xl-2">
                            <div class="widget">
                                <h4 class="widget-title mb-4">Get in Touch</h4>
                                <address class="mb-4">8014 Edith Blvd NE, Albuquerque, New York, United States</address>
                                <p class="mb-1">
                                    <a class="link-secondary text-decoration-none" href="tel:+15057922430">(505) 792-2430</a>
                                </p>
                                <p class="mb-0">
                                    <a class="link-secondary text-decoration-none" href="mailto:demo@yourdomain.com">demo@yourdomain.com</a>
                                </p>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 col-lg-3 col-xl-2">
                            <div class="widget">
                                <h4 class="widget-title mb-4">Learn More</h4>
                                <ul class="list-unstyled">
                                    <li class="mb-2">
                                        <a href="#!" class="link-secondary text-decoration-none">About</a>
                                    </li>
                                    <li class="mb-2">
                                        <a href="#!" class="link-secondary text-decoration-none">Contact</a>
                                    </li>
                                    <li class="mb-2">
                                        <a href="#!" class="link-secondary text-decoration-none">Advertise</a>
                                    </li>
                                    <li class="mb-2">
                                        <a href="#!" class="link-secondary text-decoration-none">Terms of Service</a>
                                    </li>
                                    <li class="mb-0">
                                        <a href="#!" class="link-secondary text-decoration-none">Privacy Policy</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-12 col-lg-3 col-xl-4">
                            <div class="widget">
                                <h4 class="widget-title mb-4">Our Newsletter</h4>
                                <p class="mb-4">Subscribe to our newsletter to get our news & discounts delivered to you.</p>
                                <form action="#!">
                                    <div class="row gy-4">
                                        <div class="col-12">
                                            <div class="input-group">
                                                <span class="input-group-text" id="email-newsletter-addon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                                    </svg>
                                                </span>
                                                <input type="email" class="form-control" id="email-newsletter" value="" placeholder="Email Address" aria-label="email-newsletter" aria-describedby="email-newsletter-addon" required />
                                            </div>
                                        </div>
                                        <div class="col-12">
                                            <div class="d-grid">
                                                <button class="btn btn-primary" type="submit">Subscribe</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="bg-light py-4 py-md-5 py-xl-8 border-top border-light-subtle">
                <div class="container overflow-hidden">
                    <div class="row gy-4 gy-md-0">
                        <div class="col-xs-12 col-md-7 order-1 order-md-0">
                            <div class="copyright text-center text-md-start">
                                &copy; {moment().format('YYYY')}. All Rights Reserved.
                            </div>
                            <div class="credits text-secondary text-center text-md-start mt-2 fs-7">
                                Built by Georgie Recabo
                            </div>
                        </div>

                        <div class="col-xs-12 col-md-5 order-0 order-md-1">
                            <ul class="nav justify-content-center justify-content-md-end">
                                <li class="nav-item">
                                    <a class="nav-link link-dark" href="#!">
                                        <FaFacebook size={40} color='#0866FF' />
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link link-dark" href="#!">
                                        
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link link-dark" href="#!">
                                   
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link link-dark" href="#!">
                                                          
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer
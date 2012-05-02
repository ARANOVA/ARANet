<?php

namespace ARANOVA\VendorBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class DefaultController extends Controller
{
    
    public function indexAction()
    {
        return $this->render('ARANOVAVendorBundle:Default:index.html.twig');
    }
}

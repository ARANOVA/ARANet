<?php

namespace ARANOVA\VendorBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Adapter\ArrayAdapter;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\View\TwitterBootstrapView;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="_vendors")
     * @Template()
     */
    public function indexAction()
    {
        $maxPerPage = 10;
        $currentPage = 1;
        $pages = array("All","0-E","F-Ñ","O-Z");
        $repository = $this->getDoctrine()
            ->getRepository('ARANOVAVendorBundle:AranetVendor');
        $pager = array();
        foreach ($pages as $page) {
            if (strpos($page, "-")) {
              $query = $repository->createQueryBuilder('p')
                  ->where('p.vendorCompanyName <= :upper')
                  ->andWhere('p.vendorCompanyName >= :lower')
                  ->setParameter('lower', substr($page, 0, strpos($page, "-")))
                  ->setParameter('upper', substr($page, strpos($page, "-")+1))
                  ->orderBy('p.vendorCompanyName', 'ASC')
                  ->getQuery();
          } else {
              $query = $repository->createQueryBuilder('p')
                  ->orderBy('p.vendorCompanyName', 'ASC')
                  ->getQuery();
          }
          $adapter = new DoctrineORMAdapter($query);
          $pagerfanta = new Pagerfanta($adapter);
          $pagerfanta
              ->setMaxPerPage($maxPerPage)
              ->setCurrentPage($currentPage);
          array_push($pager, $pagerfanta);
        }

        $view = new TwitterBootstrapView();
        $router = $this->get('router');
        $routeGenerator = function($page) {
            return "kk?page=".$page;
        };
    
        return array(
            "stat" => array("Compras (2011)", "Compras (2012)", "Compras (totales)"),
            "pager" => $pager,
            "pages" => $pages,
            "pagination" => $view,
            "router" => $routeGenerator
        );
    }
  
  /**
     * @Route("/test_ajax", name="test_ajax")
     */
    public function testAction()
    {
        $request = $this->get('request');
    $name=$request->request->get('formName');
    
    if($name!=""){//if the user has written his name
      $greeting='Hello '.$name.'. How are you today?';
      $return=array("responseCode"=>200,  "greeting"=>$greeting);
    }
    else{
      $return=array("responseCode"=>400, "You have to write your name!");
    }

    $return=json_encode($return);//jscon encode the array
    return new Response($return,200);
    }
    
    /**
     * @Route("/show/{id}", name="_vendor_show")
     * @Template()
     */
    public function showAction($id)
    {
      $vendor = $this->getDoctrine()
          ->getRepository('ARANOVAVendorBundle:AranetVendor')
          ->findOneById($id);

        return array(
          "vendor" => $vendor,
          "projects" => array('1', '2'),
          "budgets" => array('1', '2'),
          "invoices" => array('1', '2'),
        );
    }
    
  /**
     * @Route("/remove/{id}", name="_vendor_remove")
     * @Template()
     */
    public function removeAction($id)
    {
        return array('id' => $id);
    }
    
  /**
     * @Route("/edit/{id}", name="_vendor_edit")
     * @Template()
     */
    public function editAction($id)
    {
        $vendor = $this->getDoctrine()
          ->getRepository('ARANOVAVendorBundle:AranetVendor')
          ->findOneById($id);

        return array(
          "vendor" => $vendor
        );
    }
}

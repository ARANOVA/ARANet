<?php

namespace ARANOVA\ContactBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use Pagerfanta\Pagerfanta;
use Pagerfanta\Adapter\ArrayAdapter;
use Pagerfanta\Adapter\DoctrineORMAdapter;
use Pagerfanta\View\TwitterBootstrapView;

class DefaultController extends Controller
{
    /**
     * @Route("/{page}", defaults={"page"=1}, name="_contacts", options={"expose"=true})
     * @Template()
     */
    public function indexAction($page = 1)
    {
        $maxPerPage = 5;
        $currentPage = $page;
        $pages = array("All","0-E","F-Ñ","O-Z");
        $repository = $this->getDoctrine()
            ->getRepository('ARANOVAContactBundle:AranetContact');
        $pager = array();
        foreach ($pages as $page) {
            if (strpos($page, "-")) {
              $query = $repository->createQueryBuilder('p')
                  ->where('p.firstName <= :upper')
                  ->andWhere('p.firstName >= :lower')
                  ->setParameter('lower', substr($page, 0, strpos($page, "-")))
                  ->setParameter('upper', substr($page, strpos($page, "-")+1))
                  ->orderBy('p.firstName', 'ASC')
                  ->getQuery();
          } else {
              $query = $repository->createQueryBuilder('p')
                  ->orderBy('p.firstName', 'ASC')
                  ->getQuery();
          }
          $adapter = new DoctrineORMAdapter($query);
          $pagerfanta = new Pagerfanta($adapter);
          $pagerfanta
              ->setMaxPerPage($maxPerPage)
              ->setCurrentPage($currentPage, false, true);
          array_push($pager, $pagerfanta);
        }

        $view = new TwitterBootstrapView();
        $router = $this->get('router');
        $routeGenerator = function($page) {
        	//return Routing.generate('_contacts', { page: $page });
            return $page;
        };
    
        return array(
            "pager" => $pager,
            "pages" => $pages,
            "pagination" => $view,
            "router" => $routeGenerator
        );
    }
    
    /**
     * @Route("/show/{id}", name="_contact_show")
     * @Template()
     */
    public function showAction($id)
    {
      $contact = $this->getDoctrine()
          ->getRepository('ARANOVAContactBundle:AranetContact')
          ->findOneById($id);

        return array(
          "contact" => $contact,
        );
    }
    
    /**
     * @Route("/edit/{id}", name="_contact_edit", options={"expose"=true})
     * @Template()
     */
    public function editAction($id)
    {
      $vendor = $this->getDoctrine()
          ->getRepository('ARANOVAContactBundle:AranetContact')
          ->findOneById($id);

        return array(
          "contact" => $contact,
        );
    }
    
	/**
     * @Route("/delete/{id}", name="_contact_delete", options={"expose"=true})
     */
    public function deleteAction($id){
	// borrado de tarea de la BD
		if (!$id){
			throw $this->createNotFoundException('No se puede borrar un contacto si no se especifica su ID');
		}
		$em = $this->getDoctrine()->getEntityManager();
		$contact = $em->getRepository('ARANOVAContactBundle:AranetContact')->findOneById($id);
	 
		if (!$contact){
			throw $this->createNotFoundException('No se ha encontrado el contacto '.$id.' en la BD');
		}
	 
		// contacto exists
		// so, delete it
		$em->remove($contact); 
		$em->flush(); 
	 	
		$request = $this->get('request');
		$return=array("responseCode"=>200, 
			"message"=>"Contacto eliminado correctamente",
			"id" => $id
		);
		$return = json_encode($return);//jscon encode the array
    	return new Response($return, 200);
	}
}

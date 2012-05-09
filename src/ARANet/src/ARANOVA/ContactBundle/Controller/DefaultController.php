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
     * @var integer
     */
    private $maxPerPage = 10;
    
    /**
     * @Route("/jsonArray/{page}", defaults={"page"=1}, name="_contact_json2", options={"expose"=true})
     */
    public function jsonArrayAction($page = 1)
    {
        $request = $this->getRequest();
        $offset = $page > 0 ? ($page-1)*$this->maxPerPage : 0;
        $em = $this->getDoctrine()->getEntityManager();
        $query = $em->createQuery("SELECT c, ca, a FROM ARANOVAContactBundle:AranetContact c LEFT JOIN c.addresses ca LEFT JOIN ca.address a GROUP BY c.id");
        $query->setFirstResult($offset)->setMaxResults($this->maxPerPage);

        return $this->render('ARANOVAContactBundle:Default:json.json.twig', array('contacts' => $query->getArrayResult(), "sEcho" => $request->get("sEcho")));
        $response = new Response($contacts);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    
    /**
     * @Route("/list/{page}", defaults={"page"=1}, name="_contact_json", options={"expose"=true})
     */
    public function jsonAction($page = 1)
    {
        $request = $this->getRequest();
        $offset = $page > 0 ? ($page-1)*$this->maxPerPage : 0;
        $em = $this->getDoctrine()->getEntityManager();
        $query = $em->createQuery("SELECT c, ca, a FROM ARANOVAContactBundle:AranetContact c LEFT JOIN c.addresses ca LEFT JOIN ca.address a GROUP BY c.id");
        $query->setFirstResult($offset)->setMaxResults($this->maxPerPage);

        $contacts = json_encode(array('contacts' => $query->getArrayResult()));
        $response = new Response($contacts);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
  
    /**
     * @Route("/{page}", defaults={"page"=1}, name="_contacts", options={"expose"=true})
     * @Template()
     */
    public function indexAction($page = 1)
    {
        $pages = array("Todos");//,"0-E","F-Ñ","O-Z");
        $repository = $this->getDoctrine()
            ->getRepository('ARANOVAContactBundle:AranetContact');
        $pager = array();
        $em = $this->getDoctrine()->getEntityManager();
        foreach ($pages as $p) {
            if (strpos($p, "-")) {
              $query = $repository->createQueryBuilder('p')
                  ->where('p.firstName <= :upper')
                  ->andWhere('p.firstName >= :lower')
                  ->setParameter('lower', substr($p, 0, strpos($p, "-")))
                  ->setParameter('upper', substr($p, strpos($p, "-")+1))
                  ->orderBy('p.firstName', 'ASC')
                  ->getQuery();
          } else {
              $query = $em->createQuery("SELECT c, ca, a FROM ARANOVAContactBundle:AranetContact c LEFT JOIN c.addresses ca LEFT JOIN ca.address a GROUP BY c.id ORDER BY c.firstName ASC");
          }
          $adapter = new DoctrineORMAdapter($query);
          $pagerfanta = new Pagerfanta($adapter);
          $pagerfanta
              ->setMaxPerPage($this->maxPerPage)
              ->setCurrentPage($page, false, true);
          array_push($pager, $pagerfanta);
        }
    
        return array(
            "pager" => $pager,
            "pages" => $pages
        );
    }
        
    /**
     * @Route("/show/{id}", name="_contact_show", options={"expose"=true})
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

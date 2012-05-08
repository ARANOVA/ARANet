<?php

namespace ARANOVA\VendorBundle\DataFixtures\ORM;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use ARANOVA\VendorBundle\Entity\AranetAddress;


class LoadAddressData extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
    	$vias = array("C/", "Avda.","Pza.","Pol.","Ronda");
		$ciudades = array("Álava", "Albacete", "Alicante", "Almería", "Ávila", "Badajoz", "Baleares (Illes)", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Castellón", "Ciudad Real", "Córdoba", "A Coruña", "Cuenca", "Girona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Jaén", "León", "Lleida", "La Rioja", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Ourense", "Asturias", "Palencia", "Las Palmas", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Cantabria", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza", "Ceuta", "Melilla");
		$calles = array("Palenque", "Benedicto", "Azucena", "Violeta", "Rosa");
		$letters = array("A", "B", "C", "D");
		$nb_addresses = 50;
        for ($i=0; $i<$nb_addresses; $i++) {
        	// Addresses
        	$address = new AranetAddress();
	        $address->setAddressLine1($vias[rand(0, count($vias)-1)] . " " . $calles[rand(0, count($calles)-1)] . " " . strval(rand(1, 99)));
	        $address->setAddressLocation($ciudades[rand(0, count($ciudades)-1)]);
	        $address->setAddressState($address->getAddressLocation());
	        $address->setAddressCountry("ES");
	        $address->setAddressPostalCode(rand(20000, 99999));
	        $manager->persist($address);
	        $this->addReference('address'.$i, $address);	
        }
        
 	   	$manager->flush();
    }
    
    public function getOrder()
    {
        return 1; // the order in which fixtures will be loaded
    }
}
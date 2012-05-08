<?php
namespace ARANOVA\VendorBundle\DataFixtures\ORM;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use ARANOVA\ContactBundle\Entity\AranetContact;
use ARANOVA\VendorBundle\Entity\AranetVendor;
use ARANOVA\VendorBundle\Entity\AranetKindOfCompany;
use ARANOVA\VendorBundle\Entity\AranetVendorContact;
use ARANOVA\VendorBundle\Entity\AranetVendorStatistic;
use ARANOVA\VendorBundle\Entity\AranetAddress;
use ARANOVA\VendorBundle\Entity\AranetVendorAddress;


class LoadVendorData extends AbstractFixture implements OrderedFixtureInterface
{
    public function load(ObjectManager $manager)
    {
    	$kind_of_companies = array();
    	$types = array("tipo 1", "tipo 2", "tipo 3");
    	foreach ($types as $type) {
        	$kind_of_company = new AranetKindOfCompany();
        	$kind_of_company->setKindOfCompanyTitle($type);
        	$manager->persist($kind_of_company);
        	array_push($kind_of_companies, $kind_of_company);
    	}

    	$nb_vendors = 10;
    	$vendors = array();
        for ($i=0; $i<$nb_vendors; $i++) {
        	$vendor = new AranetVendor();
        	$vendor->setVendorUniqueName("Vendor " . strval($i));
        	$vendor->setVendorCompanyName("Vendor " . strval($i));
        	$vendor->setVendorCIF("B12345678".strval($i));
        	$vendor->setVendorKindOfCompany($kind_of_companies[rand(0, count($kind_of_companies)-1)]);
        	$manager->persist($vendor);
        	array_push($vendors, $vendor);
        	$contact = $this->getReference('contact'.strval(rand(0, 9)));
        	$vendor_contact = new AranetVendorContact();
        	$vendor_contact->setContact($contact);
        	$vendor_contact->setVendor($vendor);
        	$vendor_contact->setContactIsDefault(1);
        	$vendor->addAranetVendorContact($vendor_contact);
        	$manager->persist($vendor_contact);
        	
        	// addresses
        	$address = $this->getReference('address'.strval(rand(0, 49)));
	        $vendor_address = new AranetVendorAddress();
	        $vendor_address->setAddress($address);
	        $vendor_address->setVendor($vendor);
	        $vendor_address->setObjectaddressIsDefault(1);
	        $manager->persist($vendor_address);
	        $vendor->addAranetVendorAddress($vendor_address);

        	// Stats
        	$total = 0;
        	for ($year=2005; $year<=date("Y"); $year++) {
	        	$stat = new AranetVendorStatistic();
	        	$stat->setVendor($vendor);
	        	$stat->setStatistic("Compras (". $year .")");
	        	$stat->setValue(rand(0, 5000));
	        	$manager->persist($stat);
	        	$total += $stat->getValue();
        	}
	        
	        $stat = new AranetVendorStatistic();
	        $stat->setVendor($vendor);
	        $stat->setStatistic("Compras (totales)");
	        $stat->setValue($total);
	        $manager->persist($stat);
	    }
		
	    
        $manager->flush();
    }
    
    public function getOrder()
    {
        return 3; // the order in which fixtures will be loaded
    }
}
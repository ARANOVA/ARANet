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
        }
		    	
        $stat1 = new AranetVendorStatistic();
        $stat1->setVendor($vendor);
        $stat1->setStatistic("Compras (2011)");
        $stat1->setValue(43);
        $manager->persist($stat1);
        
        $stat2 = new AranetVendorStatistic();
        $stat2->setVendor($vendor);
        $stat2->setStatistic("Compras (2012)");
        $stat2->setValue(211);
        $manager->persist($stat2);
        
        $stat3 = new AranetVendorStatistic();
        $stat3->setVendor($vendor);
        $stat3->setStatistic("Compras (totales)");
        $stat3->setValue(300);
        $manager->persist($stat3);
        
        $address1 = new AranetAddress();
        $address1->setAddressLine1("Calle mi calle");
        $address1->setAddressLocation("Zaragoza");
        $address1->setAddressState("Zaragoza");
        $address1->setAddressCountry("ES");
        $address1->setAddressPostalCode("50015");
        $manager->persist($address1);
        
        $vendor_address1 = new AranetVendorAddress();
        $vendor_address1->setAddress($address1);
        $vendor_address1->setVendor($vendor);
        $vendor_address1->setObjectaddressIsDefault(1);
        $manager->persist($vendor_address1);
        
        $vendor->addAranetVendorAddress($vendor_address1);
        
        $manager->flush();
    }
    
    public function getOrder()
    {
        return 2; // the order in which fixtures will be loaded
    }
}
<?php
namespace ARANOVA\VendorBundle\DataFixtures\ORM;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\FixtureInterface;
use ARANOVA\VendorBundle\Entity\AranetVendor;
use ARANOVA\VendorBundle\Entity\AranetContact;
use ARANOVA\VendorBundle\Entity\AranetKindOfCompany;
use ARANOVA\VendorBundle\Entity\AranetVendorContact;
use ARANOVA\VendorBundle\Entity\AranetVendorStatistic;
use ARANOVA\VendorBundle\Entity\AranetAddress;
use ARANOVA\VendorBundle\Entity\AranetVendorAddress;


class LoadVendorData implements FixtureInterface
{
    public function load(ObjectManager $manager)
    {
        $kind_of_company = new AranetKindOfCompany();
        $kind_of_company->setKindOfCompanyTitle("tipo1");
        $manager->persist($kind_of_company);

        $vendor1 = new AranetVendor();
        $vendor1->setVendorUniqueName("Prueba");
        $vendor1->setVendorCompanyName("Prueba");
        $vendor1->setVendorCIF("B12345678");
        $vendor1->setVendorKindOfCompany($kind_of_company);
        $manager->persist($vendor1);
        
        $contact1 = new AranetContact();
        $contact1->setContactFirstName("Pablo");
        $contact1->setContactLastName("Sanchez");
        $contact1->setContactPhone("phone");
        $manager->persist($contact1);
        
        $vendor_contact = new AranetVendorContact();
        $vendor_contact->setContact($contact1);
        $vendor_contact->setVendor($vendor1);
        $vendor_contact->setObjectcontactIsDefault(1);
        $manager->persist($vendor_contact);
        
        $vendor1->addAranetVendorContact($vendor_contact);
        
        $stat1 = new AranetVendorStatistic();
        $stat1->setVendor($vendor1);
        $stat1->setStatistic("Compras (2011)");
        $stat1->setValue(43);
        $manager->persist($stat1);
        
        $stat2 = new AranetVendorStatistic();
        $stat2->setVendor($vendor1);
        $stat2->setStatistic("Compras (2012)");
        $stat2->setValue(211);
        $manager->persist($stat2);
        
        $stat3 = new AranetVendorStatistic();
        $stat3->setVendor($vendor1);
        $stat3->setStatistic("Compras (totales)");
        $stat3->setValue(300);
        $manager->persist($stat3);
        
        $vendor2 = new AranetVendor();
        $vendor2->setVendorUniqueName("Prueba 2");
        $vendor2->setVendorCompanyName("Prueba 2");
        $vendor2->setVendorCIF("ESA12345678");
        $vendor2->setVendorKindOfCompany($kind_of_company);
        $manager->persist($vendor2);
        
        $address1 = new AranetAddress();
        $address1->setAddressLine1("Calle mi calle");
        $address1->setAddressLocation("Zaragoza");
        $address1->setAddressState("Zaragoza");
        $address1->setAddressCountry("ES");
        $address1->setAddressPostalCode("50015");
        $manager->persist($address1);
        
        $vendor_address1 = new AranetVendorAddress();
        $vendor_address1->setAddress($address1);
        $vendor_address1->setVendor($vendor1);
        $vendor_address1->setObjectaddressIsDefault(1);
        $manager->persist($vendor_address1);
        
        $vendor1->addAranetVendorAddress($vendor_address1);
        
        $manager->flush();
    }
}
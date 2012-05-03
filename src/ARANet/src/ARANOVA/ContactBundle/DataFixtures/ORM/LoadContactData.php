<?php
namespace ARANOVA\ContactBundle\DataFixtures\ORM;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;

use Doctrine\Common\DataFixtures\FixtureInterface;
use ARANOVA\ContactBundle\Entity\AranetContact;


class LoadContactData extends AbstractFixture implements OrderedFixtureInterface
{
    function elimina_acentos($cadena){
        $tofind = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ";
        $replac = "AAAAAAaaaaaaOOOOOOooooooEEEEeeeeCcIIIIiiiiUUUUuuuuyNn";
        return utf8_encode((strtr(utf8_decode($cadena),utf8_decode($tofind),$replac)));
    }

    public function load(ObjectManager $manager)
    {
        # Loremize
        $firstnames = array("Pablo", "César", "Juan", "Pedro", "Ana", "Eva", "Laura", "Jaime", "Francisco", "María", "Susana", "Ángel", "Manuel", "José");
        $lastnames = array("Sánchez", "Martínez", "Díaz", "Venegas", "Rojas");
        $domains = array("gmail.com", "hotmail.com", "aranova.es");
        $nb_contacts = 10;
        for ($i=0; $i<$nb_contacts; $i++) {
            $contact = new AranetContact();
            $contact->setFirstName($firstnames[rand(0, count($firstnames)-1)]);
            $contact->setLastName($lastnames[rand(0, count($lastnames)-1)]);
            $contact->setPhone(strval(rand(91, 999)) . " " . strval(rand(100, 999)) . " " . strval(rand(100, 999)));
            $contact->setFax(strval(rand(91, 999)) . " " . strval(rand(100, 999)) . " " . strval(rand(100, 999)));
            $contact->setMobile(strval(rand(600, 699)) . " " . strval(rand(100, 999)) . " " . strval(rand(100, 999)));
            $contact->setEmail(strtolower($this->elimina_acentos($contact->getFirstName())) . "." . strtolower($this->elimina_acentos($contact->getLastName())) . "@" . $domains[rand(0, count($domains)-1)]);
            $contact->setBirthday(new \DateTime("2010-07-05T06:00:00Z"));
            $manager->persist($contact);
            $this->addReference('contact'.$i, $contact);
        }

        $manager->flush();
    }

    public function getOrder()
    {
        return 1; // the order in which fixtures will be loaded
    }
}
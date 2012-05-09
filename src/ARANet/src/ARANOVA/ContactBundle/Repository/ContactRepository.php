<?php

namespace ARANOVA\ContactBundle\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine;

class ContactRepository extends EntityRepository
{
    public function findOneByRandom()
    {
        // TODO: usar funciones nativas del motor de bases de datos
        $nb_contacts = $this->getEntityManager()
            ->createQuery('SELECT COUNT(p.id) FROM ARANOVAContactBundle:AranetContact p')->getSingleScalarResult();

        return $this->getEntityManager()
            ->createQuery('SELECT p FROM ARANOVAContactBundle:AranetContact p')
            ->setFirstResult(rand(0, $nb_contacts - 1))
            ->setMaxResults(1)
            ->getOneOrNullResult();
    }
    
}
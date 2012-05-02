<?php

namespace ARANOVA\VendorBundle\Repository;

use Doctrine\ORM\EntityRepository;

class VendorRepository extends EntityRepository
{
    public function findAllOrderedByName()
    {
        return $this->getEntityManager()
            ->createQuery('SELECT p FROM ARANOVAVendorBundle:AranetVendor p ORDER BY p.vendorCompanyName ASC')
            ->getResult();
    }
}
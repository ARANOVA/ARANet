<?php

namespace ARANOVA\VendorBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ARANOVA\VendorBundle\Entity\AranetKindOfCompany
 *
 * @ORM\Table(name="aranet_kind_of_company")
 * @ORM\Entity
 */
class AranetKindOfCompany
{
    /**
     * @var integer $id
     *
     * @ORM\Column(name="id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string $kindOfCompanyTitle
     *
     * @ORM\Column(name="kind_of_company_title", type="string", length=64, nullable=true)
     */
    private $kindOfCompanyTitle;

    /**
     * @var string $kindOfCompanyDescription
     *
     * @ORM\Column(name="kind_of_company_description", type="string", length=255, nullable=true)
     */
    private $kindOfCompanyDescription;



    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set kindOfCompanyTitle
     *
     * @param string $kindOfCompanyTitle
     */
    public function setKindOfCompanyTitle($kindOfCompanyTitle)
    {
        $this->kindOfCompanyTitle = $kindOfCompanyTitle;
    }

    /**
     * Get kindOfCompanyTitle
     *
     * @return string 
     */
    public function getKindOfCompanyTitle()
    {
        return $this->kindOfCompanyTitle;
    }

    /**
     * Set kindOfCompanyDescription
     *
     * @param string $kindOfCompanyDescription
     */
    public function setKindOfCompanyDescription($kindOfCompanyDescription)
    {
        $this->kindOfCompanyDescription = $kindOfCompanyDescription;
    }

    /**
     * Get kindOfCompanyDescription
     *
     * @return string 
     */
    public function getKindOfCompanyDescription()
    {
        return $this->kindOfCompanyDescription;
    }
}
<?php

namespace ARANOVA\ARANetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ARANOVA\ARANetBundle\Entity\AranetAddress
 *
 * @ORM\Table(name="aranet_address")
 * @ORM\Entity
 */
class AranetAddress
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
     * @var string $addressLine1
     *
     * @ORM\Column(name="address_line1", type="string", length=255, nullable=true)
     */
    private $addressLine1;

    /**
     * @var string $addressLine2
     *
     * @ORM\Column(name="address_line2", type="string", length=255, nullable=true)
     */
    private $addressLine2;
    
    /**
     * @var string $addressLocation
     *
     * @ORM\Column(name="address_location", type="string", length=128, nullable=true)
     */
    private $addressLocation;
    
    /**
     * @var string $addressState
     *
     * @ORM\Column(name="address_state", type="string", length=64, nullable=true)
     */
    private $addressState;
    
    /**
     * @var string $addressPostalCode
     *
     * @ORM\Column(name="address_postal_code", type="string", length=5, nullable=true)
     */
    private $addressPostalCode;
    
    /**
     * @var string $addressCountry
     *
     * @ORM\Column(name="address_country", type="string", length=2, nullable=true)
     */
    private $addressCountry;
    
    /**
     * Get id
     *
     * @return string 
     */
    public function __toString()
    {
        return $this->addressLine1 . " " . $this->addressLine2 . "<br/>" . $this->addressPostalCode . " " . $this->addressLocation;
    }
    

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
     * Set addressLine1
     *
     * @param string $addressLine1
     */
    public function setAddressLine1($addressLine1)
    {
        $this->addressLine1 = $addressLine1;
    }

    /**
     * Get addressLine1
     *
     * @return string 
     */
    public function getAddressLine1()
    {
        return $this->addressLine1;
    }

    /**
     * Set addressLine2
     *
     * @param string $addressLine2
     */
    public function setAddressLine2($addressLine2)
    {
        $this->addressLine2 = $addressLine2;
    }

    /**
     * Get addressLine2
     *
     * @return string 
     */
    public function getAddressLine2()
    {
        return $this->addressLine2;
    }

    /**
     * Set addressLocation
     *
     * @param string $addressLocation
     */
    public function setAddressLocation($addressLocation)
    {
        $this->addressLocation = $addressLocation;
    }

    /**
     * Get addressLocation
     *
     * @return string 
     */
    public function getAddressLocation()
    {
        return $this->addressLocation;
    }

    /**
     * Set addressState
     *
     * @param string $addressState
     */
    public function setAddressState($addressState)
    {
        $this->addressState = $addressState;
    }

    /**
     * Get addressState
     *
     * @return string 
     */
    public function getAddressState()
    {
        return $this->addressState;
    }

    /**
     * Set addressPostalCode
     *
     * @param string $addressPostalCode
     */
    public function setAddressPostalCode($addressPostalCode)
    {
        $this->addressPostalCode = $addressPostalCode;
    }

    /**
     * Get addressPostalCode
     *
     * @return string 
     */
    public function getAddressPostalCode()
    {
        return $this->addressPostalCode;
    }

    /**
     * Set addressCountry
     *
     * @param string $addressCountry
     */
    public function setAddressCountry($addressCountry)
    {
        $this->addressCountry = $addressCountry;
    }

    /**
     * Get addressCountry
     *
     * @return string 
     */
    public function getAddressCountry()
    {
        return $this->addressCountry;
    }
}
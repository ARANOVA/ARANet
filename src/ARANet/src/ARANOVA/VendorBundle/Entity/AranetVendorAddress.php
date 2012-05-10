<?php

namespace ARANOVA\VendorBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * ARANOVA\VendorBundle\Entity\AranetVendorAddress
 *
 * @ORM\Table(name="aranet_vendor_address")
 * @ORM\Entity
 */
class AranetVendorAddress
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
     * @var integer $address
     *
     * @ORM\ManyToOne(targetEntity="AranetAddress")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="address_id", referencedColumnName="id", onDelete="CASCADE")
     * })
     */
    private $address;
    
    /**
     * @var $vendor
     *
     * @ORM\ManyToOne(targetEntity="AranetVendor")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="vendor_id", referencedColumnName="id", onDelete="CASCADE")
     * })
     */
    private $vendor;
    
    /**
     * @var string $objectaddressName
     *
     * @ORM\Column(name="objectaddress_name", type="string", length=128, nullable=true)
     */
    private $objectaddressName;

    /**
     * @var string $objectaddressType
     *
     * @ORM\Column(name="objectaddress_type", type="string", length=16, nullable=true)
     */
    private $objectaddressType;
    
    /**
     * @var integer $objectaddressIsDefault
     *
     * @ORM\Column(name="objectaddress_is_default", type="integer", nullable=true)
     */
    private $objectaddressIsDefault;

    /**
     * @var datetime $createdAt
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=true)
     */
    private $createdAt;

    /**
     * @var integer $createdBy
     *
     * @ORM\Column(name="created_by", type="integer", nullable=true)
     */
    private $createdBy;

    /**
     * @var datetime $updatedAt
     *
     * @ORM\Column(name="updated_at", type="datetime", nullable=true)
     */
    private $updatedAt;

    /**
     * @var integer $updatedBy
     *
     * @ORM\Column(name="updated_by", type="integer", nullable=true)
     */
    private $updatedBy;

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
     * Set objectaddressName
     *
     * @param string $objectaddressName
     */
    public function setObjectaddressName($objectaddressName)
    {
        $this->objectaddressName = $objectaddressName;
    }

    /**
     * Get objectaddressName
     *
     * @return string 
     */
    public function getObjectaddressName()
    {
        return $this->objectaddressName;
    }

    /**
     * Set objectaddressType
     *
     * @param string $objectaddressType
     */
    public function setObjectaddressType($objectaddressType)
    {
        $this->objectaddressType = $objectaddressType;
    }

    /**
     * Get objectaddressType
     *
     * @return string 
     */
    public function getObjectaddressType()
    {
        return $this->objectaddressType;
    }

    /**
     * Set objectaddressIsDefault
     *
     * @param integer $objectaddressIsDefault
     */
    public function setObjectaddressIsDefault($objectaddressIsDefault)
    {
        $this->objectaddressIsDefault = $objectaddressIsDefault;
    }

    /**
     * Get objectaddressIsDefault
     *
     * @return integer 
     */
    public function getObjectaddressIsDefault()
    {
        return $this->objectaddressIsDefault;
    }

    /**
     * Set createdAt
     *
     * @param datetime $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * Get createdAt
     *
     * @return datetime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set createdBy
     *
     * @param integer $createdBy
     */
    public function setCreatedBy($createdBy)
    {
        $this->createdBy = $createdBy;
    }

    /**
     * Get createdBy
     *
     * @return integer 
     */
    public function getCreatedBy()
    {
        return $this->createdBy;
    }

    /**
     * Set updatedAt
     *
     * @param datetime $updatedAt
     */
    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
    }

    /**
     * Get updatedAt
     *
     * @return datetime 
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set updatedBy
     *
     * @param integer $updatedBy
     */
    public function setUpdatedBy($updatedBy)
    {
        $this->updatedBy = $updatedBy;
    }

    /**
     * Get updatedBy
     *
     * @return integer 
     */
    public function getUpdatedBy()
    {
        return $this->updatedBy;
    }

    /**
     * Set address
     *
     * @param ARANOVA\VendorBundle\Entity\AranetAddress $address
     */
    public function setAddress(\ARANOVA\VendorBundle\Entity\AranetAddress $address)
    {
        $this->address = $address;
    }

    /**
     * Get address
     *
     * @return ARANOVA\VendorBundle\Entity\AranetAddress 
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set vendor
     *
     * @param ARANOVA\VendorBundle\Entity\AranetVendor $vendor
     */
    public function setVendor(\ARANOVA\VendorBundle\Entity\AranetVendor $vendor)
    {
        $this->vendor = $vendor;
    }

    /**
     * Get vendor
     *
     * @return ARANOVA\VendorBundle\Entity\AranetVendor 
     */
    public function getVendor()
    {
        return $this->vendor;
    }
}
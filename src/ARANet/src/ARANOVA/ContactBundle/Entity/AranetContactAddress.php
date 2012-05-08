<?php

namespace ARANOVA\ContactBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Gedmo\Mapping\Annotation as Gedmo;

/**
 * ARANOVA\ContactBundle\Entity\AranetContactAddress
 *
 * @ORM\Table(name="aranet_contact_address")
 * @ORM\Entity
 */
class AranetContactAddress
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
     * @var ARANOVA\VendorBundle\Entity\AranetAddress $address
     *
     * @ORM\OneToOne(targetEntity="ARANOVA\VendorBundle\Entity\AranetAddress")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="address_id", referencedColumnName="id")
     * })
     */
    private $address;
    
    /**
     * @var $contact
     *
     * @ORM\ManyToOne(targetEntity="AranetContact")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="contact_id", referencedColumnName="id")
     * })
     */
    private $contact;
    
    /**
     * @var string $addressName
     *
     * @ORM\Column(name="address_name", type="string", length=128, nullable=true)
     */
    private $addressName;

    /**
     * @var string $addressType
     *
     * @ORM\Column(name="address_type", type="string", length=16, nullable=true)
     */
    private $addressType;
    
    /**
     * @var integer $addressIsDefault
     *
     * @ORM\Column(name="address_is_default", type="integer", nullable=true)
     */
    private $addressIsDefault;

    /**
     * @var datetime $createdAt
     *
     * @Gedmo\Timestampable(on="create")
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
     * @Gedmo\Timestampable(on="update")
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
     * Set addressName
     *
     * @param string $addressName
     */
    public function setAddressName($addressName)
    {
        $this->addressName = $addressName;
    }

    /**
     * Get addressName
     *
     * @return string 
     */
    public function getAddressName()
    {
        return $this->addressName;
    }

    /**
     * Set addressType
     *
     * @param string $addressType
     */
    public function setAddressType($addressType)
    {
        $this->addressType = $addressType;
    }

    /**
     * Get addressType
     *
     * @return string 
     */
    public function getAddressType()
    {
        return $this->addressType;
    }

    /**
     * Set addressIsDefault
     *
     * @param integer $addressIsDefault
     */
    public function setAddressIsDefault($addressIsDefault)
    {
        $this->addressIsDefault = $addressIsDefault;
    }

    /**
     * Get addressIsDefault
     *
     * @return integer 
     */
    public function getAddressIsDefault()
    {
        return $this->addressIsDefault;
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
     * Set contact
     *
     * @param ARANOVA\ContactBundle\Entity\AranetContact $contact
     */
    public function setContact(\ARANOVA\ContactBundle\Entity\AranetContact $contact)
    {
        $this->contact = $contact;
    }

    /**
     * Get contact
     *
     * @return ARANOVA\ContactBundle\Entity\AranetContact 
     */
    public function getContact()
    {
        return $this->contact;
    }
}
<?php

namespace ARANOVA\VendorBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * ARANOVA\VendorBundle\Entity\AranetVendorContact
 *
 * @ORM\Table(name="aranet_vendor_contact")
 * @ORM\Entity
 */
class AranetVendorContact
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
     * @var integer $contact
     *
     * @ORM\OneToOne(targetEntity="ARANOVA\ContactBundle\Entity\AranetContact")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="contact_id", referencedColumnName="id")
     * })
     */
    private $contact;
    
    /**
     * @var $vendor
     *
     * @ORM\ManyToOne(targetEntity="AranetVendor")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="vendor_id", referencedColumnName="id")
     * })
     */
    private $vendor;
    
    /**
     * @var string $objectcontactRol
     *
     * @ORM\Column(name="objectcontact_rol", type="string", length=128, nullable=true)
     */
    private $objectcontactRol;

    /**
     * @var integer $objectcontactIsDefault
     *
     * @ORM\Column(name="objectcontact_is_default", type="integer", nullable=true)
     */
    private $objectcontactIsDefault;

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
     * Set objectcontactRol
     *
     * @param string $objectcontactRol
     */
    public function setObjectcontactRol($objectcontactRol)
    {
        $this->objectcontactRol = $objectcontactRol;
    }

    /**
     * Get objectcontactRol
     *
     * @return string 
     */
    public function getObjectcontactRol()
    {
        return $this->objectcontactRol;
    }

    /**
     * Set objectcontactIsDefault
     *
     * @param integer $objectcontactIsDefault
     */
    public function setObjectcontactIsDefault($objectcontactIsDefault)
    {
        $this->objectcontactIsDefault = $objectcontactIsDefault;
    }

    /**
     * Get objectcontactIsDefault
     *
     * @return integer 
     */
    public function getObjectcontactIsDefault()
    {
        return $this->objectcontactIsDefault;
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
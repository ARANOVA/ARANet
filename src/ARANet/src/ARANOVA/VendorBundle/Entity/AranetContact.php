<?php

namespace ARANOVA\ARANetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ARANOVA\ARANetBundle\Entity\AranetContact
 *
 * @ORM\Table(name="aranet_contact")
 * @ORM\Entity
 */
class AranetContact
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
     * @var string $contactSalutation
     *
     * @ORM\Column(name="contact_salutation", type="string", length=6, nullable=true)
     */
    private $contactSalutation;

    /**
     * @var string $contactFirstName
     *
     * @ORM\Column(name="contact_first_name", type="string", length=128, nullable=true)
     */
    private $contactFirstName;

    /**
     * @var string $contactLastName
     *
     * @ORM\Column(name="contact_last_name", type="string", length=128, nullable=true)
     */
    private $contactLastName;

    /**
     * @var string $contactEmail
     *
     * @ORM\Column(name="contact_email", type="string", length=128, nullable=true)
     */
    private $contactEmail;

    /**
     * @var string $contactPhone
     *
     * @ORM\Column(name="contact_phone", type="string", length=16, nullable=true)
     */
    private $contactPhone;

    /**
     * @var string $contactFax
     *
     * @ORM\Column(name="contact_fax", type="string", length=16, nullable=true)
     */
    private $contactFax;

    /**
     * @var string $contactMobile
     *
     * @ORM\Column(name="contact_mobile", type="string", length=16, nullable=true)
     */
    private $contactMobile;

    /**
     * @var date $contactBirthday
     *
     * @ORM\Column(name="contact_birthday", type="date", nullable=true)
     */
    private $contactBirthday;

    /**
     * @var string $contactOrgUnit
     *
     * @ORM\Column(name="contact_org_unit", type="string", length=128, nullable=true)
     */
    private $contactOrgUnit;

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
     * @var datetime $deletedAt
     *
     * @ORM\Column(name="deleted_at", type="datetime", nullable=true)
     */
    private $deletedAt;

    /**
     * @var integer $deletedBy
     *
     * @ORM\Column(name="deleted_by", type="integer", nullable=true)
     */
    private $deletedBy;

    /**
     * Get id
     *
     * @return string 
     */
    public function __toString()
    {
        return $this->contactFirstName . " " . $this->contactLastName;
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
     * Set contactSalutation
     *
     * @param string $contactSalutation
     */
    public function setContactSalutation($contactSalutation)
    {
        $this->contactSalutation = $contactSalutation;
    }

    /**
     * Get contactSalutation
     *
     * @return string 
     */
    public function getContactSalutation()
    {
        return $this->contactSalutation;
    }

    /**
     * Set contactFirstName
     *
     * @param string $contactFirstName
     */
    public function setContactFirstName($contactFirstName)
    {
        $this->contactFirstName = $contactFirstName;
    }

    /**
     * Get contactFirstName
     *
     * @return string 
     */
    public function getContactFirstName()
    {
        return $this->contactFirstName;
    }

    /**
     * Set contactLastName
     *
     * @param string $contactLastName
     */
    public function setContactLastName($contactLastName)
    {
        $this->contactLastName = $contactLastName;
    }

    /**
     * Get contactLastName
     *
     * @return string 
     */
    public function getContactLastName()
    {
        return $this->contactLastName;
    }

    /**
     * Set contactEmail
     *
     * @param string $contactEmail
     */
    public function setContactEmail($contactEmail)
    {
        $this->contactEmail = $contactEmail;
    }

    /**
     * Get contactEmail
     *
     * @return string 
     */
    public function getContactEmail()
    {
        return $this->contactEmail;
    }

    /**
     * Set contactPhone
     *
     * @param string $contactPhone
     */
    public function setContactPhone($contactPhone)
    {
        $this->contactPhone = $contactPhone;
    }

    /**
     * Get contactPhone
     *
     * @return string 
     */
    public function getContactPhone()
    {
        return $this->contactPhone;
    }

    /**
     * Set contactFax
     *
     * @param string $contactFax
     */
    public function setContactFax($contactFax)
    {
        $this->contactFax = $contactFax;
    }

    /**
     * Get contactFax
     *
     * @return string 
     */
    public function getContactFax()
    {
        return $this->contactFax;
    }

    /**
     * Set contactMobile
     *
     * @param string $contactMobile
     */
    public function setContactMobile($contactMobile)
    {
        $this->contactMobile = $contactMobile;
    }

    /**
     * Get contactMobile
     *
     * @return string 
     */
    public function getContactMobile()
    {
        return $this->contactMobile;
    }

    /**
     * Set contactBirthday
     *
     * @param date $contactBirthday
     */
    public function setContactBirthday($contactBirthday)
    {
        $this->contactBirthday = $contactBirthday;
    }

    /**
     * Get contactBirthday
     *
     * @return date 
     */
    public function getContactBirthday()
    {
        return $this->contactBirthday;
    }

    /**
     * Set contactOrgUnit
     *
     * @param string $contactOrgUnit
     */
    public function setContactOrgUnit($contactOrgUnit)
    {
        $this->contactOrgUnit = $contactOrgUnit;
    }

    /**
     * Get contactOrgUnit
     *
     * @return string 
     */
    public function getContactOrgUnit()
    {
        return $this->contactOrgUnit;
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
     * Set deletedAt
     *
     * @param datetime $deletedAt
     */
    public function setDeletedAt($deletedAt)
    {
        $this->deletedAt = $deletedAt;
    }

    /**
     * Get deletedAt
     *
     * @return datetime 
     */
    public function getDeletedAt()
    {
        return $this->deletedAt;
    }

    /**
     * Set deletedBy
     *
     * @param integer $deletedBy
     */
    public function setDeletedBy($deletedBy)
    {
        $this->deletedBy = $deletedBy;
    }

    /**
     * Get deletedBy
     *
     * @return integer 
     */
    public function getDeletedBy()
    {
        return $this->deletedBy;
    }
}
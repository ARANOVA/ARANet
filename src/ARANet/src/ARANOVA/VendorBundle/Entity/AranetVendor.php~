<?php

namespace ARANOVA\VendorBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * ARANOVA\VendorBundle\Entity\AranetVendor
 *
 * @ORM\Table(name="aranet_vendor")
 * @ORM\Entity(repositoryClass="ARANOVA\VendorBundle\Repository\VendorRepository")
 */
class AranetVendor
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
     * @var string $vendorUniqueName
     *
     * @ORM\Column(name="vendor_unique_name", type="string", length=128, nullable=false)
     */
    private $vendorUniqueName;

    /**
     * @var string $vendorCompanyName
     *
     * @ORM\Column(name="vendor_company_name", type="string", length=255, nullable=false)
     */
    private $vendorCompanyName;

    /**
     * @var string $vendorCif
     *
     * @ORM\Column(name="vendor_cif", type="string", length=12, nullable=true)
     */
    private $vendorCif;

    /**
     * @var integer $vendorKindOfCompanyId
     *
     * @ORM\ManyToOne(targetEntity="AranetKindOfCompany")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="vendor_kind_of_company_id", referencedColumnName="id")
     * })
     */
    private $vendorKindOfCompany;

    /**
     * @var date $vendorSince
     *
     * @ORM\Column(name="vendor_since", type="date", nullable=true)
     */
    private $vendorSince;

    /**
     * @var string $vendorWebsite
     *
     * @ORM\Column(name="vendor_website", type="string", length=255, nullable=true)
     */
    private $vendorWebsite;

    /**
     * @var text $vendorComments
     *
     * @ORM\Column(name="vendor_comments", type="text", nullable=true)
     */
    private $vendorComments;

    /**
     * @var integer $vendorHasTags
     *
     * @ORM\Column(name="vendor_has_tags", type="integer", nullable=true)
     */
    private $vendorHasTags;

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
     * @ORM\OneToMany(targetEntity="AranetVendorStatistic", mappedBy="vendor")
     **/
    protected $statistics = null;

    /**
     * @ORM\OneToMany(targetEntity="AranetVendorContact", mappedBy="vendor")
     **/
    protected $contacts = null;

    /**
     * @ORM\OneToMany(targetEntity="AranetVendorAddress", mappedBy="vendor")
     **/
    protected $addresses = null;
    
	public function __construct()
    {
        $this->statistics = new ArrayCollection();
        $this->contacts = new ArrayCollection();
        $this->addresses = new ArrayCollection();
    }
    
	/**
     * Get default contact
     *
     * @return ARANOVA/VendorBundle/Entity/AranetVendorContact 
     */
    public function getDefaultContact()
    {
        foreach ($this->contacts as $contact) {
        	if ($contact->getContactIsDefault()) {
        		return $contact;
        	}
        }
        return null;
    }
    
	/**
     * Get default address
     *
     * @return ARANOVA/VendorBundle/Entity/AranetVendorAddress 
     */
    public function getDefaultAddress()
    {
        foreach ($this->addresses as $address) {
        	if ($address->getObjectaddressIsDefault()) {
        		return $address;
        	}
        }
        return null;
    }
    
	/**
     * Get compras statistics
     *
     * @return ARANOVA/VendorBundle/Entity/AranetStatistic 
     */
    public function getCompras()
    {
    	$data = array();
        foreach ($this->statistics as $statistic) {
        	if (strpos($statistic->getStatistic(), "Compras") == 0 and $statistic->getYear() != "totales") {
        		array_push($data, $statistic);
        	}
        }
        // TODO: Ordenar por a�os
        return $data;
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
     * Set vendorUniqueName
     *
     * @param string $vendorUniqueName
     */
    public function setVendorUniqueName($vendorUniqueName)
    {
        $this->vendorUniqueName = $vendorUniqueName;
    }

    /**
     * Get vendorUniqueName
     *
     * @return string 
     */
    public function getVendorUniqueName()
    {
        return $this->vendorUniqueName;
    }

    /**
     * Set vendorCompanyName
     *
     * @param string $vendorCompanyName
     */
    public function setVendorCompanyName($vendorCompanyName)
    {
        $this->vendorCompanyName = $vendorCompanyName;
    }

    /**
     * Get vendorCompanyName
     *
     * @return string 
     */
    public function getVendorCompanyName()
    {
        return $this->vendorCompanyName;
    }

    /**
     * Set vendorCif
     *
     * @param string $vendorCif
     */
    public function setVendorCif($vendorCif)
    {
        $this->vendorCif = $vendorCif;
    }

    /**
     * Get vendorCif
     *
     * @return string 
     */
    public function getVendorCif()
    {
        return $this->vendorCif;
    }

    /**
     * Set vendorKindOfCompanyId
     *
     * @param integer $vendorKindOfCompanyId
     */
    public function setVendorKindOfCompanyId($vendorKindOfCompanyId)
    {
        $this->vendorKindOfCompanyId = $vendorKindOfCompanyId;
    }

    /**
     * Get vendorKindOfCompanyId
     *
     * @return integer 
     */
    public function getVendorKindOfCompanyId()
    {
        return $this->vendorKindOfCompanyId;
    }

    /**
     * Set vendorSince
     *
     * @param date $vendorSince
     */
    public function setVendorSince($vendorSince)
    {
        $this->vendorSince = $vendorSince;
    }

    /**
     * Get vendorSince
     *
     * @return date 
     */
    public function getVendorSince()
    {
        return $this->vendorSince;
    }

    /**
     * Set vendorWebsite
     *
     * @param string $vendorWebsite
     */
    public function setVendorWebsite($vendorWebsite)
    {
        $this->vendorWebsite = $vendorWebsite;
    }

    /**
     * Get vendorWebsite
     *
     * @return string 
     */
    public function getVendorWebsite()
    {
        return $this->vendorWebsite;
    }

    /**
     * Set vendorComments
     *
     * @param text $vendorComments
     */
    public function setVendorComments($vendorComments)
    {
        $this->vendorComments = $vendorComments;
    }

    /**
     * Get vendorComments
     *
     * @return text 
     */
    public function getVendorComments()
    {
        return $this->vendorComments;
    }

    /**
     * Set vendorHasTags
     *
     * @param integer $vendorHasTags
     */
    public function setVendorHasTags($vendorHasTags)
    {
        $this->vendorHasTags = $vendorHasTags;
    }

    /**
     * Get vendorHasTags
     *
     * @return integer 
     */
    public function getVendorHasTags()
    {
        return $this->vendorHasTags;
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

    /**
     * Add statistics
     *
     * @param ARANOVA\VendorBundle\Entity\AranetVendorStatistic $statistics
     */
    public function addAranetVendorStatistic(\ARANOVA\VendorBundle\Entity\AranetVendorStatistic $statistics)
    {
        $this->statistics[] = $statistics;
    }

    /**
     * Get statistics
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getStatistics()
    {
        return $this->statistics;
    }

    /**
     * Set vendorKindOfCompany
     *
     * @param ARANOVA\VendorBundle\Entity\AranetKindOfCompany $vendorKindOfCompany
     */
    public function setVendorKindOfCompany(\ARANOVA\VendorBundle\Entity\AranetKindOfCompany $vendorKindOfCompany)
    {
        $this->vendorKindOfCompany = $vendorKindOfCompany;
    }

    /**
     * Get vendorKindOfCompany
     *
     * @return ARANOVA\VendorBundle\Entity\AranetKindOfCompany 
     */
    public function getVendorKindOfCompany()
    {
        return $this->vendorKindOfCompany;
    }

    /**
     * Add contacts
     *
     * @param ARANOVA\VendorBundle\Entity\AranetVendorContact $contacts
     */
    public function addAranetVendorContact(\ARANOVA\VendorBundle\Entity\AranetVendorContact $contacts)
    {
        $this->contacts[] = $contacts;
    }

    /**
     * Get contacts
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getContacts()
    {
        return $this->contacts;
    }

    /**
     * Add addresses
     *
     * @param ARANOVA\VendorBundle\Entity\AranetVendorAddress $addresses
     */
    public function addAranetVendorAddress(\ARANOVA\VendorBundle\Entity\AranetVendorAddress $addresses)
    {
        $this->addresses[] = $addresses;
    }

    /**
     * Get addresses
     *
     * @return Doctrine\Common\Collections\Collection 
     */
    public function getAddresses()
    {
        return $this->addresses;
    }
}
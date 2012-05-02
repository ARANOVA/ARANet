<?php

namespace ARANOVA\ARANetBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ARANOVA\ARANetBundle\Entity\AranetVendorStatistic
 *
 * @ORM\Table(name="aranet_vendor_statistic")
 * @ORM\Entity
 */
class AranetVendorStatistic
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
     * @var string $statistic
     *
     * @ORM\Column(name="statistic", type="string", length=255, nullable=false)
     */
    private $statistic;

    /**
     * @var decimal $value
     *
     * @ORM\Column(name="value", type="decimal", nullable=false)
     */
    private $value;

    /**
     * @var datetime $startDate
     *
     * @ORM\Column(name="start_date", type="datetime", nullable=true)
     */
    private $startDate;

    /**
     * @var datetime $endDate
     *
     * @ORM\Column(name="end_date", type="datetime", nullable=true)
     */
    private $endDate;

    /**
     * @var AranetVendor
     *
     * @ORM\ManyToOne(targetEntity="AranetVendor")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="vendor_id", referencedColumnName="id")
     * })
     */
    private $vendor;

	/**
     * Get statistic year
     *
     * @return integer
     */
    public function getYear()
    {
    	$start = strpos($this->statistic, "(")+1;
        return substr($this->statistic, $start, strpos($this->statistic, ")")-$start);
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
     * Set statistic
     *
     * @param string $statistic
     */
    public function setStatistic($statistic)
    {
        $this->statistic = $statistic;
    }

    /**
     * Get statistic
     *
     * @return string 
     */
    public function getStatistic()
    {
        return $this->statistic;
    }

    /**
     * Set value
     *
     * @param decimal $value
     */
    public function setValue($value)
    {
        $this->value = $value;
    }

    /**
     * Get value
     *
     * @return decimal 
     */
    public function getValue()
    {
        return $this->value;
    }

    /**
     * Set startDate
     *
     * @param datetime $startDate
     */
    public function setStartDate($startDate)
    {
        $this->startDate = $startDate;
    }

    /**
     * Get startDate
     *
     * @return datetime 
     */
    public function getStartDate()
    {
        return $this->startDate;
    }

    /**
     * Set endDate
     *
     * @param datetime $endDate
     */
    public function setEndDate($endDate)
    {
        $this->endDate = $endDate;
    }

    /**
     * Get endDate
     *
     * @return datetime 
     */
    public function getEndDate()
    {
        return $this->endDate;
    }

    /**
     * Set vendor
     *
     * @param ARANOVA\ARANetBundle\Entity\AranetVendor $vendor
     */
    public function setVendor(\ARANOVA\ARANetBundle\Entity\AranetVendor $vendor)
    {
        $this->vendor = $vendor;
    }

    /**
     * Get vendor
     *
     * @return ARANOVA\ARANetBundle\Entity\AranetVendor 
     */
    public function getVendor()
    {
        return $this->vendor;
    }
}
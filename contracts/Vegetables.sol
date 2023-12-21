// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Vegetables {
    enum VegetableStatus {
        STORED,
        PLANTED,
        HARVESTED,
        AUDITED,
        PROCESSED,
        CERTIFIED,
        PACKED,
        ON_SALE,
        PURCHASED
    }

    struct Vegetable {
        uint256 skuDigits;
        uint256 upcDigits;
        address ownerID;
        address farmerID;
        address inspectorID;
        address manufacturerID;
        address distributorID;
        address retailerID;
        address customerID;
        uint256 price;
        uint256 quantity;
        VegetableStatus status;
    }

    mapping(uint256 => Vegetable[]) vegetables;

    uint256 public vegetablesCount;
    uint256 public skuDigits;

    struct SubVegetable {
        uint256 skuDigits;
        uint256 upcDigits;
        address ownerID;
        address farmerID;
        address inspectorID;
        address manufacturerID;
        address distributorID;
        address retailerID;
        address customerID;
        uint256 price;
        uint256 quantity;
        VegetableStatus status;
    }

    SubVegetable[] subVegetables;

    event VegetableCreated(
        uint256 skuDigits,
        uint256 upcDigits,
        address indexed ownerID,
        uint256 price,
        uint256 quantity
    );

    event VegetablePlanted(
        uint256 skuDigits,
        address indexed ownerID,
        address farmerID
    );

    event VegetableHarvested(
        uint256 skuDigits,
        address indexed ownerID,
        address farmerID
    );

    event VegetableAudited(
        uint256 skuDigits,
        address ownerID,
        address inspectorID
    );

    event VegetableProcessed(
        uint256 skuDigits,
        address ownerID,
        address manufacturerID
    );

    event VegetableCertified(
        uint256 skuDigits,
        address ownerID,
        address inspectorID
    );

    event VegetablePacked(
        uint256 skuDigits,
        address ownerID,
        address distributorID
    );

    event VegetableOnSale(uint256 skuDigits, address retailerID);

    event VegetablePurchased(
        uint256 skuDigits,
        address ownerID,
        address customerID,
        uint256 amount
    );

    constructor() {
        skuDigits = 0;
        vegetablesCount = 0;
    }

    function createVegetable(
        uint256 _upcDigits,
        uint256 _price,
        uint256 _quantity
    ) public payable {
        require(msg.value == _price, "Payment must match the price.");

        Vegetable memory vegetable = Vegetable(
            skuDigits,
            _upcDigits,
            msg.sender,
            address(0),
            address(0),
            address(0),
            address(0),
            address(0),
            address(0),
            _price,
            _quantity,
            VegetableStatus.STORED
        );

        vegetables[skuDigits].push(vegetable);
        subVegetables.push(
            SubVegetable(
                skuDigits,
                _upcDigits,
                msg.sender,
                address(0),
                address(0),
                address(0),
                address(0),
                address(0),
                address(0),
                _price,
                _quantity,
                VegetableStatus.STORED
            )
        );

        vegetablesCount++;
        skuDigits++;

        emit VegetableCreated(
            skuDigits,
            _upcDigits,
            msg.sender,
            _price,
            _quantity
        );
    }

    function plantVegetable(
        uint256 _skuDigits,
        address _receiver,
        uint256 _index
    ) public {
        Vegetable storage vegetable = vegetables[_skuDigits][_index];
        SubVegetable storage subVegetable = subVegetables[_skuDigits];

        require(vegetable.ownerID == msg.sender, "Invalid receiver.");
        require(
            vegetable.status == VegetableStatus.STORED,
            "Vegetables have already been planted."
        );

        vegetable.ownerID = _receiver;
        vegetable.farmerID = msg.sender;
        vegetable.status = VegetableStatus.PLANTED;

        subVegetable.ownerID = _receiver;
        subVegetable.farmerID = msg.sender;
        subVegetable.status = VegetableStatus.PLANTED;

        emit VegetablePlanted(_skuDigits, _receiver, msg.sender);
    }

    function harvestVegetable(
        uint256 _skuDigits,
        address _receiver,
        uint256 _index
    ) public {
        Vegetable storage vegetable = vegetables[_skuDigits][_index];
        SubVegetable storage subVegetable = subVegetables[_skuDigits];

        require(vegetable.ownerID == msg.sender, "Invalid receiver.");
        require(
            vegetable.status == VegetableStatus.PLANTED,
            "Vegetables have already been harvested."
        );

        vegetable.ownerID = _receiver;
        vegetable.farmerID = msg.sender;
        vegetable.status = VegetableStatus.HARVESTED;

        subVegetable.ownerID = _receiver;
        subVegetable.farmerID = msg.sender;
        subVegetable.status = VegetableStatus.HARVESTED;

        emit VegetableHarvested(_skuDigits, _receiver, msg.sender);
    }

    function auditVegetable(
        uint256 _skuDigits,
        address _receiver,
        uint256 _index
    ) public {
        Vegetable storage vegetable = vegetables[_skuDigits][_index];
        SubVegetable storage subVegetable = subVegetables[_skuDigits];

        require(vegetable.ownerID == msg.sender, "Invalid receiver.");
        require(
            vegetable.status == VegetableStatus.HARVESTED,
            "Vegetables have already been harvested."
        );

        vegetable.ownerID = _receiver;
        vegetable.inspectorID = msg.sender;
        vegetable.status = VegetableStatus.AUDITED;

        subVegetable.ownerID = _receiver;
        subVegetable.inspectorID = msg.sender;
        subVegetable.status = VegetableStatus.AUDITED;

        emit VegetableAudited(_skuDigits, _receiver, msg.sender);
    }

    function processVegetable(
        uint256 _skuDigits,
        address _receiver,
        uint256 _index
    ) public {
        Vegetable storage vegetable = vegetables[_skuDigits][_index];
        SubVegetable storage subVegetable = subVegetables[_skuDigits];

        require(vegetable.ownerID == msg.sender, "Invalid receiver.");
        require(
            vegetable.status == VegetableStatus.AUDITED,
            "Vegetables have already been audited."
        );

        vegetable.ownerID = _receiver;
        vegetable.manufacturerID = msg.sender;
        vegetable.status = VegetableStatus.PROCESSED;

        subVegetable.ownerID = _receiver;
        subVegetable.manufacturerID = msg.sender;
        subVegetable.status = VegetableStatus.PROCESSED;

        emit VegetableProcessed(_skuDigits, _receiver, msg.sender);
    }

    function certifyVegetable(
        uint256 _skuDigits,
        address _receiver,
        uint256 _index
    ) public {
        Vegetable storage vegetable = vegetables[_skuDigits][_index];
        SubVegetable storage subVegetable = subVegetables[_skuDigits];

        require(vegetable.ownerID == msg.sender, "Invalid receiver.");
        require(
            vegetable.status == VegetableStatus.PROCESSED,
            "Vegetables have already been certified."
        );

        vegetable.ownerID = _receiver;
        vegetable.inspectorID = msg.sender;
        vegetable.status = VegetableStatus.CERTIFIED;

        subVegetable.ownerID = _receiver;
        subVegetable.inspectorID = msg.sender;
        subVegetable.status = VegetableStatus.CERTIFIED;

        emit VegetableCertified(_skuDigits, _receiver, msg.sender);
    }

    function packVegetable(
        uint256 _skuDigits,
        address _receiver,
        uint256 _index
    ) public {
        Vegetable storage vegetable = vegetables[_skuDigits][_index];
        SubVegetable storage subVegetable = subVegetables[_skuDigits];

        require(vegetable.ownerID == msg.sender, "Invalid receiver.");
        require(
            vegetable.status == VegetableStatus.CERTIFIED,
            "Vegetables have already been packed."
        );

        vegetable.ownerID = _receiver;
        vegetable.distributorID = msg.sender;
        vegetable.status = VegetableStatus.PACKED;

        subVegetable.ownerID = _receiver;
        subVegetable.distributorID = msg.sender;
        subVegetable.status = VegetableStatus.PACKED;

        emit VegetablePacked(_skuDigits, _receiver, msg.sender);
    }

    function sellVegetable(uint256 _skuDigits, uint256 _index) public {
        Vegetable storage vegetable = vegetables[_skuDigits][_index];
        SubVegetable storage subVegetable = subVegetables[_skuDigits];

        require(vegetable.ownerID == msg.sender, "Invalid receiver.");
        require(
            vegetable.status == VegetableStatus.PACKED,
            "Vegetables have already been on sale."
        );

        vegetable.retailerID = msg.sender;
        vegetable.status = VegetableStatus.ON_SALE;

        subVegetable.retailerID = msg.sender;
        subVegetable.status = VegetableStatus.ON_SALE;

        emit VegetableOnSale(_skuDigits, msg.sender);
    }

    function purchaseVegetable(uint256 _skuDigits, uint256 _index) public {
        Vegetable storage vegetable = vegetables[_skuDigits][_index];
        SubVegetable storage subVegetable = subVegetables[_skuDigits];

        require(
            vegetable.status == VegetableStatus.ON_SALE,
            "Vegetables have already been on purchased."
        );

        uint256 amount = vegetable.price;

        payable(msg.sender).transfer(amount);

        vegetable.ownerID = msg.sender;
        vegetable.customerID = msg.sender;
        vegetable.status = VegetableStatus.PURCHASED;

        subVegetable.ownerID = msg.sender;
        subVegetable.customerID = msg.sender;
        subVegetable.status = VegetableStatus.PURCHASED;

        emit VegetablePurchased(_skuDigits, msg.sender, msg.sender, amount);
    }

    function getVegetable(
        uint256 _skuDigits
    )
        public
        view
        returns (
            uint256,
            uint256,
            address,
            address,
            address,
            address,
            address,
            address,
            address,
            uint256,
            uint256,
            VegetableStatus
        )
    {
        SubVegetable memory vegetable = subVegetables[_skuDigits];

        return (
            vegetable.skuDigits,
            vegetable.upcDigits,
            vegetable.ownerID,
            vegetable.farmerID,
            vegetable.inspectorID,
            vegetable.manufacturerID,
            vegetable.distributorID,
            vegetable.retailerID,
            vegetable.customerID,
            vegetable.price,
            vegetable.quantity,
            vegetable.status
        );
    }

    function getAllVegetables() public view returns (SubVegetable[] memory) {
        return subVegetables;
    }
}

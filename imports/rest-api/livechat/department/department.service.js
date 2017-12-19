import messages from '../../constants/messages';

class DepartmentService {

    constructor(Department, Match, check, Random) {
        this.Department = Department;
        this.Match = Match;
        this.check = check;
        this.Random = Random;
    }

    validateDepartmentData(department) {
        const pattern = this.Match.ObjectIncluding({
            enabled: Boolean,
            description: this.Match.Optional(String),
            showOnRegistration: Boolean,
            name: String
        });

        try {
            this.check(department, pattern);
        } catch (error) {
            throw new Error(messages.verifyParameters);
        }
    }

    validateDepartmentId(departmentId) {
        try {
            this.check(departmentId, String);
        } catch (error) {
            throw new Error(messages.verifyParameters);
        }
    }

    prepareDepartment(departmentForInsert, agentsQuantity) {
        return {
            _id: departmentForInsert._id || this.Random.id(),
            enabled: departmentForInsert.enabled,
            name: departmentForInsert.name,
            showOnRegistration: departmentForInsert.showOnRegistration,
            description: departmentForInsert.description,
            numAgents: agentsQuantity,
            _updatedAt: new Date()
        };
    }

    insert(department, agentsQuantity) {
        try {
            return this.Department.insert(this.prepareDepartment(department, agentsQuantity));
        } catch (error) {
            throw new Error(messages.errorOnInsert);
        }
    }

    findOne(departmentId) {
        try {
            return this.Department.findOne({_id: departmentId});
        } catch (error) {
            throw new Error(messages.errorOnFind);
        }
    }

    removeOne(departmentId) {
        try {
            this.Department.remove({_id: departmentId});
        } catch (error) {
            throw new Error(messages.errorOnDelete);
        }
    }

    updateOne(departmentId, department, agentsQuantity) {
        department._id = departmentId;
        try {
            this.Department.update(
                {_id: departmentId},
                {$set: this.prepareDepartment(department, agentsQuantity)}
            );
        } catch (error) {
            throw new Error(messages.errorOnUpdate);
        }
    }

    findAll() {
        try {
            return this.Department.find({}).fetch();
        } catch (error) {
            throw new Error(messages.errorOnFind);
        }
    }

}

export default DepartmentService;
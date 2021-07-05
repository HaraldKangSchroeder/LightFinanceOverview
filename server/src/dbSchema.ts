
export const schemaSession = {
    validator: {
        $jsonSchema : {
            bsonType: "object",
            required: ["username", "sessionId"],
            properties : {
                username : {
                    bsonType : "string"
                },
                sessionId : {
                    bsonType : "string"
                },
                createdAt : {
                    bsonType : "Date"
                }
            }
        }
    }
}

export const schemaLightFinanceOverview = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password", "data"],
            properties: {
                username: {
                    bsonType: "string"
                },
                password: {
                    bsonType: "string"
                },
                data: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["name", "organization", "amount", "selectedMonth", "rythm", "type"],
                        properties: {
                            name: {
                                bsonType: "string",
                                description: "name of the payment"
                            },
                            organization: {
                                bsonType: "string",
                            },
                            amount: {
                                bsonType: "double",
                            },
                            selectedMonth: {
                                bsonType: "int",
                            },
                            rythm: {
                                bsonType: "int"
                            },
                            type: {
                                bsonType: "string"
                            }
                        }
                    }
                }
            }
        }
    }
};

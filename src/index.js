/**
 * @class Validator
 * @classdesc Classe responsável pela validação de estrutura de dados
 */
class Validator {

    /**
     * Creates an instance of Validator.
     * @memberof Validator
     */
    constructor() {

    }

    /**
     * @param {String} inputName
     * @param {Array} exceptionFields
     * @returns
     */
    validateExceptionFields(inputName, exceptionFields) {
        let isValid = false
        // Validando se o campo atual está no array de exceções
        // Caso ele tenha uma condicional para ser exceção ele será validado
        exceptionFields.forEach((exceptionField) => {
            // Caso o campo atual se enquadre na condição de exceção ele será enquadrado como válido
            if (
                exceptionField.fieldName === inputName &&
                (exceptionField.condition || typeof exceptionField.condition === 'undefined')
            ) {
                isValid = true
            }
        })

        return isValid
    }

    getAllEmptyFields(data, exceptionFields = []) {
        let emptyFields = []
        Object.keys(data).forEach((inputName) => {
            if (!this.validateExceptionFields(inputName, exceptionFields)) {
                // Caso o indice atual seja do tipo array, ele deve validar a quantidade de indices
				if (Array.isArray(data[safeKey(inputName)]) && data[safeKey(inputName)].length == 0) {
					emptyFields.push(inputName)
				// Caso ele seja um array e contenha mais de um indice ele deve percorrer cada indice o validando
				} else if (Array.isArray(data[safeKey(inputName)])) {
					data[safeKey(inputName)].forEach((dataField, index) => {
						if (typeof dataField !== 'object' && dataField === '') {
							emptyFields.push(`${inputName}.${index}`)
						} else {
							const tempEmptyFields = this.getAllEmptyFields(dataField, exceptionFields)
							const filteredNameFields = tempEmptyFields.map((emptyFieldName) => `${inputName}.${index}.${emptyFieldName}`)
							emptyFields = [...emptyFields, ...filteredNameFields]
						}
					})
				// Caso ele seja do tipo objeto, ele deve percorrer cada atributo do objeto validando se esta vazio
				} else if (typeof data[safeKey(inputName)] == 'object') {
					if (data[safeKey(inputName)] == null) {
						emptyFields.push(inputName)
					} else {
						const tempEmptyFields = this.getAllEmptyFields(data[safeKey(inputName)], exceptionFields)
						const filteredNameFields = tempEmptyFields.map((emptyFieldName) => `${inputName}.${emptyFieldName}`)
						emptyFields = [...emptyFields, ...filteredNameFields]
					}
				// Caso ele seja uma string ele deve apenas validar se ela esta vazia
				} else if (typeof data[safeKey(inputName)] === 'string' && data[safeKey(inputName)] === '') {
					emptyFields.push(inputName)
				}
            }
        })

        return emptyFields
    }

    /**
     * @param {Object} data
     * @param {Array} [exceptionFields=[]]
     * @returns
     * @memberof Validator
     */
    validate(data, exceptionFields = []) {
        const emptyFields = this.getAllEmptyFields(data, exceptionFields)
        const emptyFieldsToString = emptyFields.join(', ')

        return ({
            message: emptyFieldsToString,
            fields: emptyFields,
        })
    }

}

module.exports = new Validator()
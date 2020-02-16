# @spark/validator #

Módulo para validação completa de estrutura de dados

### Tecnologias utilizadas ###

* Node.js
* POO

### Como ele funciona ###

Basicamente é passado uma estrutura de dados com campos específicos onde ele valida por completo a árvore de dados indexando cada campo identificado como vazio ou inválido.

### Exemplos de execução ###

```javascript
const Spark = require('spark-validator')

const dataFields = {
    name: '',
    cellphone: ''
}

/**
 * Utilizando o método .validate() é possível validar um objeto mapeando todos os campos vazios encontrados 
 */
const emptyFields = Spark.validate(dataFields)

/**
 * O resultado dessa execução retornará uma estrutura dessa forma:
 * Object {fields: ["name", "cellphone"], message: "name, cellphone"}
 */

/**
 * Também é possivel denominar campos para serem ignorados na validação, basta adicionar um array de objetos contendo fieldName como atributo junto com o nome do campo a ser ignora
 */

const emptyFields = Spark.validate(dataFields, [{
    fieldName: 'name',
}])

/**
 * O resultado dessa execução retornará uma estrutura dessa forma:
 * Object {fields: ["cellphone"], message: "cellphone"}
 */

/**
 * Também é possível denominar condições para que o campo seja uma exceção, basta adicionar mais um atributo no objeto de exçeção chamado condition ao qual ele respeitará a condição para ser ignorado
 */

const emptyFields = Spark.validate(dataFields, [{
    fieldName: 'cellphone',
    condition: dataFields.cellphone === '',
}])

/**
 *  O resultado dessa execução retornará uma estrutura dessa forma:
 * Object {fields: ["name"], message: "name"}
 */


```

### Contribution guidelines ###

* Validação de estrutura de dados ✓
* Campos de exceção ✓
* Condições para campos serem exceção ✓
* Condições para campos serem exceção por tipo ✓

### Colaboradores ###

* Matchbox Brasil
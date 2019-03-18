describe('Test suite', function () {
  var arr

  before('Create the array', function () {
    arr = [0, 1, 2]
  })

  after('Destory the array', function () {
    arr = undefined
  })

  it('should be ok', function () {
    assert.equal(arr[0], 0)
  })
})

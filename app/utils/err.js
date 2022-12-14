module.exports = {
    err1:{
        code: '000001',
        message: '参数错误',
    },
    err2:{
        err: 999999,
        message: '服务器出错，请联系管理员',
    },
    err3:(err)=>{
        return {
            err: -3,
            msg: err,
        }
    },
    err4:{
        err: -4,
        msg: '操作失败',
    },
    err5:{
        err: -5,
        msg: '用户名不存在或密码错误',
    },
    err6:{
        err: -6,
        msg: '该券您已领取过（未使用），请使用后再领取',
    },
    err7:{
        err: -7,
        msg: '用户名已存在',
    },
    err8:{
        err: -8,
        msg: '该学校已登记',
    },
    err9:{
        err: -9,
        msg: '改名称已存在',
    },
    err10:{
        err: -10,
        msg: '该券不属于您的商铺，请核实',
    },
    err11:{
        err: -11,
        msg: '券码有误，请核实',
    },
    err12:{
        err: -12,
        msg: '商品已售罄 0.0',
    },
    err13:{
        err: -13,
        msg: '该券已过期，请告知用户联系管理员退款',
    },
    err14:{
        err: -14,
        msg: '您所在的学校暂未开通此商家，敬请期待',
    },
    err15:{
        err: -15,
        msg: '该商铺已下架',
    },
    err16:{
        code: '000001',
        message: '图片上传失败，请联系管理员',
    },
}
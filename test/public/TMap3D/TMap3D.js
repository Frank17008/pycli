!(function () {
  (window.TMap3D = {}),
    (window.TMap3D.S3M = {}),
    (window.TMap3D.Utils = {}),
    (window.TMap3D.Application = {}),
    (window.TMap3D.Clusters = {}),
    (window.TMap3D.Billboard = {}),
    (window.TMap3D.Effects = {}),
    (window.TMap3D.HtmlPlot = {}),
    (window.TMap3D.GeoPlot = {}),
    (window.TMap3D.ParticlePlot = {}),
    (window.TMap3D.Tools = {}),
    (window.TMap3D.MilitaryPlot = {}),
    (window.TMap3D.Layers = {}),
    (window.TMap3D.Controls = {}),
    (window.TMap3D.GltfPlot = {}),
    (window.TMap3D.Symbols = {}),
    (window.TMap3D.Scenes = {}),
    (window.TMap3D.FlyManager = {});
  (window.TMap3D.HtmlPlot_PlotTypes = {
    SIMPLELABEL: 'simplelabel',
    GRADIENTSLABEL: 'gradientslabel',
    LOCATIONLABEL: 'locationlabel',
  }),
    (window.TMap3D.GeoPlot_PlotTypes = {
      MARKER: 'marker',
      TEXT: 'text',
      POLYLINE: 'polyline',
      POLYGON: 'polygon',
      CIRCLE: 'circle',
      RECTANGLE: 'rectangle',
      DYNAMICFENCE: 'dynamicfence',
      NORMALFENCE: 'normalfence',
      CORRIDOR: 'corridor',
      POLYLINEVOLUME: 'polylinevolume',
    }),
    (window.TMap3D.Military_PlotTypes = {
      ARC: 'arc',
      ELLIPSE: 'ellipse',
      CURVE: 'curve',
      CLOSED_CURVE: 'closedcurve',
      LUNE: 'lune',
      SECTOR: 'sector',
      GATHERING_PLACE: 'gatheringplace',
      STRAIGHT_ARROW: 'straightarrow',
      ASSAULT_DIRECTION: 'assaultdirection',
      ATTACK_ARROW: 'attackarrow',
      TAILED_ATTACK_ARROW: 'tailedattackarrow',
      SQUAD_COMBAT: 'squadcombat',
      TAILED_SQUAD_COMBAT: 'tailedsquadcombat',
      FINE_ARROW: 'finearrow',
      CIRCLE: 'circle',
      DOUBLE_ARROW: 'doublearrow',
      POLYLINE: 'polyline',
      FREEHAND_LINE: 'freehandline',
      POLYGON: 'polygon',
      FREEHAND_POLYGON: 'freehandpolygon',
      RECTANGLE: 'rectangle',
      MARKER: 'marker',
      TRIANGLE: 'triangle',
    }),
    (window.TMap3D.ParticlePlotTypes = { FIRE: 'fire', FOUNTAIN: 'fountain' });
})(),
  (TMap3D.BaseUtils = (function () {
    var scriptName = 'TMap3D.js';
    function _getScriptLocation() {
      for (
        var e,
          t,
          i = new RegExp('(^|(.*?))\\/(' + scriptName + ')(\\?|$)'),
          o = document.getElementsByTagName('script'),
          n = '',
          r = 0,
          s = o.length;
        r < s;
        r++
      )
        if ((e = o[r].src) && (t = e.match(i))) {
          n = t[1];
          break;
        }
      return n;
    }
    var host = _getScriptLocation(),
      e = {
        inheritPrototype: function (e, t) {
          t = Object.create(t.prototype);
          (t.constructor = e).prototype = t;
        },
        extend: function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var i,
              o = arguments[t];
            for (i in o) e[i] = o[i];
          }
          return e;
        },
        indexOf: function (e, t) {
          return e.indexOf(t);
        },
        getScriptLocation: function () {
          var e = document.getElementsByTagName('script');
          return e[e.length - 1].getAttribute('src');
        },
        getHostPath: function () {
          return host;
        },
        getScriptDictoryLocation: function () {
          var e = this.getScriptLocation();
          if (e || !(e.length < 0)) return e.substring(0, e.lastIndexOf('/') + 1);
        },
        createError: function (e, t) {
          return t ? new Error(e + '\r\nBecause :' + t.message) : new Error(e);
        },
        addtrustmyself: function () {
          this.addtrusturl(window.location.href);
        },
        addpopwinmyself: function () {
          this.popupwindow(window.location.href);
        },
        addCSSFiles: function (e) {
          if (e && !(e.length <= 0)) {
            for (var t = [], i = 0, o = e.length; i < o; i++)
              t.push("<link type='text/css' rel='stylesheet' href = '" + host + '/' + e[i] + "'/> ");
            0 < t.length && document.write(t.join(''));
          }
        },
        addJSFiles: function (e) {
          if (e && !(e.length <= 0)) {
            for (var t = [], i = 0, o = e.length; i < o; i++)
              t.push("<script type='text/javascript' src='" + host + '/' + e[i] + "'></script>");
            0 < t.length && document.write(t.join(''));
          }
        },
        toJson: function (e) {
          switch (e.constructor) {
            case Object:
              var t,
                i = '{';
              for (t in e) e.hasOwnProperty(t) && (i += "'" + t + "':" + TMap.Utils.BaseUtils.toJson(e[t]) + ',');
              return (i = ',' === i.substr(i.length - 1) ? i.substr(0, i.length - 1) : i) + '}';
            case Array:
              for (var o = '[', n = 0; n < e.length; n++) e[n] && (o += TMap.Utils.BaseUtils.toJson(e[n]) + ',');
              return (o = ',' === o.substr(o.length - 1) ? o.substr(0, o.length - 1) : o) + ']';
            case (Boolean, Date, String):
              return '"' + e.toString() + '"';
            case Function:
              break;
            case Number:
              return e.toString();
          }
        },
        uuid: function () {
          for (var e = [], t = '0123456789abcdef', i = 0; i < 36; i++)
            e[i] = t.substr(Math.floor(16 * Math.random()), 1);
          return (
            (e[14] = '4'), (e[19] = t.substr((3 & e[19]) | 8, 1)), (e[8] = e[13] = e[18] = e[23] = '-'), e.join('')
          );
        },
      };
    return (
      (e.JsonToStr = function (t) {
        var i,
          o,
          n = [];
        for (o in t)
          t.hasOwnProperty(o) &&
            (i = (function (t) {
              if ('function' != typeof t)
                return 'object' == typeof t && null !== t
                  ? e.JsonToStr(t)
                  : /^(string|number)$/.test(typeof t)
                  ? "'" + t + "'"
                  : t;
            })(t[o])) &&
            n.push("'" + o + "':" + i);
        return '{' + n.join(',') + '}';
      }),
      (e.isTypeRight = function (param, type) {
        switch (type) {
          case 'string':
            return 'string' == typeof param;
          case 'int':
            return 'number' == typeof param && -1 === param.toString().indexOf('.');
          case 'number':
            return 'number' == typeof param;
          case 'boolean':
            return 'boolean' == typeof param;
          case 'Array':
            return param instanceof Array == !0;
          case 'function':
            return 'function' == typeof param;
          case 'object':
            return 'object' == typeof param;
          case 'undefined':
            return void 0 === param;
          default:
            return param instanceof eval(type);
        }
      }),
      e
    );
  })()),
  TMap3D.BaseUtils.addCSSFiles(['lib/Cesium/Widgets/widgets.css', 'TMap3D.css']),
  TMap3D.BaseUtils.addJSFiles(['lib/pako_inflate.js']),
  Array.prototype.indexOf ||
    (Array.prototype.indexOf = function (e) {
      for (var t, i = 0; (t = this[i]); i++) if (t == e) return i;
      return -1;
    }),
  (TMap3D.S3M.ContentState = Object.freeze({ UNLOADED: 0, LOADING: 1, PARSING: 2, READY: 3, FAILED: 4 })),
  (TMap3D.S3M.S3MCompressType = Object.freeze({
    encNONE: 0,
    enrS3TCDXTN: 14,
    enrPVRTPF_PVRTC2: 19,
    enrPVRTPF_PVRTC: 20,
    enrPVRTPF_PVRTC_4bpp: 21,
    enrPVRTPF_ETC1: 22,
  })),
  (TMap3D.S3M.S3MPixelFormat = Object.freeze({
    LUMINANCE_8: 1,
    LUMINANCE_16: 2,
    ALPHA: 3,
    ALPHA_4_LUMINANCE_4: 4,
    LUMINANCE_ALPHA: 5,
    RGB_565: 6,
    BGR565: 7,
    RGB: 10,
    BGR: 11,
    ARGB: 12,
    ABGR: 13,
    BGRA: 14,
    WEBP: 25,
    RGBA: 28,
    DXT1: 17,
    DXT2: 18,
    DXT3: 19,
    DXT4: 20,
    DXT5: 21,
  })),
  (TMap3D.S3M.VertexCompressOptions = Object.freeze({
    SVC_Vertex: 1,
    SVC_Normal: 2,
    SVC_VertexColor: 4,
    SVC_SecondColor: 8,
    SVC_TexutreCoord: 16,
    SVC_TexutreCoordIsW: 32,
  })),
  (TMap3D.S3M.S3MTilesFS = `
    uniform sampler2D uTexture;
    #ifdef TexCoord2
        uniform sampler2D uTexture2;
    #endif
        uniform vec4 uDiffuseColor;
        uniform vec4 uAmbientColor;
        varying vec4 vColor;
        varying vec4 vTexCoord;
        varying vec4 vSecondColor;
        void main()
        {
            vec4 color = vColor * texture2D(uTexture, vTexCoord.xy);
        #ifdef TexCoord2
            color *= texture2D(uTexture2, vTexCoord.zw);
        #endif
            gl_FragColor = czm_gammaCorrect(color);
        }
    `),
  (TMap3D.S3M.S3MTilesVS = `
    attribute vec4 aPosition;
    attribute vec4 aTexCoord0;
    #ifdef TexCoord2
        attribute vec4 aTexCoord1;
    #endif
        varying vec4 vTexCoord;
        attribute vec4 aColor;
        varying vec4 vColor;
        varying vec4 vSecondColor;
        void main()
        {
            vTexCoord.xy = aTexCoord0.xy;
        #ifdef TexCoord2
            vTexCoord.zw = aTexCoord1.xy;
        #endif
            vColor = aColor;
            vSecondColor = vec4(1.0,0.0,0.0,0.6);
            gl_Position = czm_modelViewProjection * vec4(aPosition.xyz, 1.0);
        }
    `),
  (function () {
    var e = (TMap3D.S3M.S3MCreateIndexBufferJob = function () {
      (this.model = void 0), (this.context = void 0), (this.index = 0);
    });
    (e.prototype.set = function (e, t, i) {
      (this.model = t), (this.context = e), (this.index = i);
    }),
      (e.prototype.execute = function () {
        var t = this.context;
        let i = this.model.arrIndexPackage[this.index];
        var o = this.model.vertexPackage.verticesCount;
        if (!Cesium.defined(i)) throw new Cesium.DeveloperError('index package is null');
        if (!Cesium.defined(i.indexBuffer)) {
          if (!Cesium.defined(i.indicesTypedArray)) throw new Cesium.DeveloperError('index buffer is null');
          let e = Cesium.IndexDatatype.UNSIGNED_SHORT;
          (1 === i.indexType || o >= Cesium.Math.SIXTY_FOUR_KILOBYTES) &&
            t.elementIndexUint &&
            (e = Cesium.IndexDatatype.UNSIGNED_INT),
            (i.indexBuffer = Cesium.Buffer.createIndexBuffer({
              context: t,
              typedArray: i.indicesTypedArray,
              usage: Cesium.BufferUsage.STATIC_DRAW,
              indexDatatype: e,
            })),
            (i.indicesTypedArray = null),
            delete i.indicesTypedArray;
        }
      });
  })(),
  (function () {
    var e = (TMap3D.S3M.S3MCreateVertexJob = function () {
      (this.context = void 0), (this.model = void 0), (this.index = void 0);
    });
    (e.prototype.set = function (e, t, i) {
      (this.context = e), (this.model = t), (this.index = i);
    }),
      (e.prototype.execute = function () {
        var e = this.context,
          t = this.index,
          i = this.model.vertexPackage;
        let o = i.vertexAttributes[t];
        if (!Cesium.defined(o)) throw new Cesium.DeveloperError('attribute is null');
        if (-1 !== i.instanceIndex && !Cesium.defined(this.model._instanceBuffer)) {
          if (!Cesium.defined(i.instanceBuffer)) throw new Cesium.DeveloperError('instance buffer is null');
          this.model.instanceBuffer = Cesium.Buffer.createVertexBuffer({
            context: e,
            typedArray: i.instanceBuffer,
            usage: Cesium.BufferUsage.STATIC_DRAW,
          });
        }
        1 !== o.instanceDivisor
          ? Cesium.defined(o.vertexBuffer) ||
            ((o.vertexBuffer = Cesium.Buffer.createVertexBuffer({
              context: e,
              typedArray: o.typedArray,
              usage: Cesium.BufferUsage.STATIC_DRAW,
            })),
            (o.typedArray = null),
            delete o.typedArray)
          : (o.vertexBuffer = this.model.instanceBuffer);
      });
  })(),
  (function () {
    var e = (TMap3D.S3M.RenderEntity = function (e) {
      (this.layer = e.layer),
        (this.vertexPackage = e.vertexPackage),
        (this.arrIndexPackage = e.arrIndexPackage),
        (this.vertexBufferToCreate = new Cesium.Queue()),
        (this.indexBufferToCreate = new Cesium.Queue());
      let t, i;
      for (t = 0, i = this.vertexPackage.vertexAttributes.length; t < i; t++) this.vertexBufferToCreate.enqueue(t);
      for (t = 0, i = this.arrIndexPackage.length; t < i; t++) this.indexBufferToCreate.enqueue(t);
      (this.boundingVolume = e.boundingVolume),
        (this.material = e.material),
        (this.modelMatrix = e.modelMatrix),
        (this.shaderProgram = void 0),
        (this.vertexArray = void 0),
        (this.colorCommand = void 0),
        (this.ready = !1);
    });
    let r = new TMap3D.S3M.S3MCreateVertexJob(),
      s = new TMap3D.S3M.S3MCreateIndexBufferJob();
    (e.prototype.createBuffers = function (e) {
      !(function (e, t) {
        var i = e.layer.context;
        let o = e.vertexBufferToCreate;
        for (; o.length; ) {
          var n = o.peek();
          if ((r.set(i, e, n), !t.jobScheduler.execute(r, Cesium.JobType.BUFFER))) break;
          o.dequeue();
        }
      })(this, e),
        (function (e, t) {
          var i = e.layer.context;
          let o = e.indexBufferToCreate;
          for (; o.length; ) {
            var n = o.peek();
            if ((s.set(i, e, n), !t.jobScheduler.execute(s, Cesium.JobType.BUFFER))) break;
            o.dequeue();
          }
        })(this, e);
    }),
      (e.prototype.createCommand = Cesium.DeveloperError.throwInstantiationError),
      (e.prototype.update = Cesium.DeveloperError.throwInstantiationError),
      (e.prototype.isDestroyed = Cesium.DeveloperError.throwInstantiationError),
      (e.prototype.destroy = Cesium.DeveloperError.throwInstantiationError);
  })(),
  (function () {
    var e = (TMap3D.S3M.S3MCacheFileRenderEntity = function (e) {
      TMap3D.S3M.RenderEntity.call(this, e);
    });
    ((e.prototype = Object.create(TMap3D.S3M.RenderEntity.prototype)).constructor = TMap3D.S3M.RenderEntity),
      (e.prototype.createCommand = function () {
        var e, t, i, o, n, r;
        Cesium.defined(this.colorCommand) ||
          ((e = this.layer.context),
          (o = this.vertexPackage),
          (n = this.arrIndexPackage),
          (t = o.vertexAttributes),
          (i = o.attrLocation),
          n.length < 1 ||
            ((o = n[0]),
            (n = this.material),
            (this.shaderProgram = (function (e, t, i) {
              let o = new Cesium.ShaderSource({ sources: [TMap3D.S3M.S3MTilesVS] }),
                n = new Cesium.ShaderSource({ sources: [TMap3D.S3M.S3MTilesFS] });
              return (
                Cesium.defined(t.aNormal) && (o.defines.push('VertexNormal'), n.defines.push('VertexNormal')),
                0 < i.textures.length && (o.defines.push('TexCoord'), n.defines.push('TexCoord')),
                2 == i.textures.length && (o.defines.push('TexCoord2'), n.defines.push('TexCoord2')),
                Cesium.ShaderProgram.fromCache({
                  context: e,
                  vertexShaderSource: o,
                  fragmentShaderSource: n,
                  attributeLocations: t,
                })
              );
            })(e, i, n)),
            (this.vertexArray = new Cesium.VertexArray({ context: e, attributes: t, indexBuffer: o.indexBuffer })),
            (this.colorCommand = new Cesium.DrawCommand({
              primitiveType: o.primitiveType,
              modelMatrix: this.modelMatrix,
              boundingVolume: Cesium.BoundingSphere.clone(this.boundingVolume),
              pickId: 'vSecondColor',
              vertexArray: this.vertexArray,
              shaderProgram: this.shaderProgram,
              pass: n.bTransparentSorting ? Cesium.Pass.TRANSLUCENT : Cesium.Pass.CESIUM_3D_TILE,
              renderState: n.bTransparentSorting
                ? Cesium.RenderState.fromCache({
                    cull: { enabled: !0 },
                    depthTest: { enabled: !0, func: Cesium.DepthFunction.LESS_OR_EQUAL },
                    blending: Cesium.BlendingState.ALPHA_BLEND,
                  })
                : Cesium.RenderState.fromCache({
                    cull: { enabled: !0 },
                    depthTest: { enabled: !0, func: Cesium.DepthFunction.LESS_OR_EQUAL },
                  }),
            })),
            (this.colorCommand.uniformMap =
              ((r = n),
              {
                uTexture: function () {
                  return r.textures[0];
                },
                uTextureWidth: function () {
                  return r.textures[0]._width;
                },
                uTexture2: function () {
                  return r.textures[1];
                },
                uTexture2Width: function () {
                  return r.textures[1]._width;
                },
                uDiffuseColor: function () {
                  return r.diffuseColor;
                },
                uAmbientColor: function () {
                  return r.ambientColor;
                },
              })),
            (this.vertexPackage = null),
            (this.arrIndexPackage = null),
            (this.ready = !0)));
      }),
      (e.prototype.update = function (e) {
        if (!this.ready) return this.createBuffers(e), void this.createCommand(e);
        e.commandList.push(this.colorCommand);
      }),
      (e.prototype.isDestroyed = function () {
        return !1;
      }),
      (e.prototype.destroy = function () {
        return (
          (this.shaderProgram =
            this.shaderProgram && !this.shaderProgram.isDestroyed() && this.shaderProgram.destroy()),
          (this.vertexArray = this.vertexArray && !this.vertexArray.isDestroyed() && this.vertexArray.destroy()),
          (this.colorCommand = void 0),
          (this.vertexPackage = null),
          (this.arrIndexPackage = null),
          Cesium.destroyObject(this)
        );
      });
  })(),
  (TMap3D.S3M.S3MContentFactory = {
    OSGBFile: function (e) {
      return new TMap3D.S3M.S3MCacheFileRenderEntity(e);
    },
    OSGBCacheFile: function (e) {
      return new TMap3D.S3M.S3MCacheFileRenderEntity(e);
    },
  }),
  (function () {
    var e = (TMap3D.S3M.DDSTexture = function (e, t, i) {
      let o = e._gl;
      (this.id = t),
        (this._size = i.imageBuffer.length),
        (this._context = e),
        (this._width = i.width),
        (this._height = i.height),
        (this._texture = null),
        (this._internalFormat = i.internalFormat),
        (this._wrapS = Cesium.defaultValue(i.wrapS, Cesium.TextureWrap.CLAMP_TO_EDGE)),
        (this._wrapT = Cesium.defaultValue(i.wrapT, Cesium.TextureWrap.CLAMP_TO_EDGE)),
        (this.id = t),
        (this._target = o.TEXTURE_2D),
        (this._texture = o.createTexture()),
        o.bindTexture(o.TEXTURE_2D, this._texture);
      let n = 0,
        r = 0;
      var s = (function (e, t, i, o) {
        let n = e.length,
          r = i,
          s = o,
          a = 0;
        for (;;) {
          var l = Cesium.PixelFormat.compressedTextureSizeInBytes(t, r, s);
          if (((a += l), (r >>= 1), (s >>= 1), 0 == r && 0 == s)) break;
          (r = Math.max(r, 1)), (s = Math.max(s, 1));
        }
        return a === n;
      })(i.imageBuffer, this._internalFormat, this._width, this._height);
      let a = this._width,
        l = this._height;
      do {
        var h = Cesium.PixelFormat.compressedTextureSizeInBytes(this._internalFormat, a, l),
          u = new Uint8Array(i.imageBuffer.buffer, i.imageBuffer.byteOffset + n, h);
        o.compressedTexImage2D(o.TEXTURE_2D, r++, this._internalFormat, a, l, 0, u),
          (a = Math.max(a >> 1, 1)),
          (l = Math.max(l >> 1, 1)),
          (n += h);
      } while (n < i.imageBuffer.length && s);
      1 < r
        ? (o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MAG_FILTER, o.LINEAR),
          o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.LINEAR_MIPMAP_LINEAR))
        : (o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MAG_FILTER, o.LINEAR),
          o.texParameteri(o.TEXTURE_2D, o.TEXTURE_MIN_FILTER, o.LINEAR)),
        o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_S, this._wrapS),
        o.texParameteri(o.TEXTURE_2D, o.TEXTURE_WRAP_T, this._wrapT),
        o.bindTexture(o.TEXTURE_2D, null);
    });
    (e.prototype.enable = function () {
      let e = this._context._gl;
      e.activeTexture(this._gl.TEXTURE0), e.bindTexture(this._target, this._texture);
    }),
      (e.prototype.disable = function () {
        let e = this._context._gl;
        e.bindTexture(this._target, null);
      }),
      (e.prototype.isDestroyed = function () {
        return !1;
      }),
      (e.prototype.destroy = function () {
        let e = this._context._gl;
        e.deleteTexture(this._texture), (this._texture = null), (this.id = 0), Cesium.destroyObject(this);
      });
  })(),
  (function () {
    var e = (TMap3D.S3M.MaterialPass = function () {
      (this.ambientColor = new Cesium.Color()),
        (this.diffuseColor = new Cesium.Color()),
        (this.specularColor = new Cesium.Color(0, 0, 0, 0)),
        (this.shininess = 50),
        (this.bTransparentSorting = !1),
        (this.textures = []);
    });
    (e.prototype.isDestroyed = function () {
      return !1;
    }),
      (e.prototype.destroy = function () {
        return destroyObject(this);
      });
  })(),
  (function () {
    function u(o, n, r, e, s) {
      let a = {};
      var l = e.geodes;
      for (let e = 0, t = l.length; e < t; e++) {
        var h = l[e],
          u = h.matrix,
          c = Cesium.Matrix4.multiply(o.modelMatrix, u, new Cesium.Matrix4());
        let i;
        Cesium.defined(s.boundingVolume) &&
          ((i = new Cesium.BoundingSphere(s.boundingVolume.sphere.center, s.boundingVolume.sphere.radius)),
          Cesium.BoundingSphere.transform(i, o.modelMatrix, i));
        var p = h.skeletonNames;
        for (let t = 0, e = p.length; t < e; t++) {
          var d = p[t],
            m = n.geoPackage[d],
            f = m.vertexPackage,
            y = m.arrIndexPackage,
            v = m.pickInfo;
          let e;
          0 < y.length && (e = r[y[0].materialCode]);
          m = Cesium.defined(i)
            ? i
            : (function (t, e) {
                var i = new Cesium.BoundingSphere();
                let o = new Cesium.Cartesian3();
                var n = t.vertexAttributes[0],
                  r = n.componentsPerAttribute,
                  s =
                    Cesium.defined(t.nCompressOptions) &&
                    (t.nCompressOptions & TMap3D.S3M.VertexCompressOption.SVC_Vertex) ===
                      TMap3D.S3M.VertexCompressOption.SVC_Vertex;
                let a = 1,
                  l,
                  h;
                h = s
                  ? ((a = t.vertCompressConstant),
                    (l = new Cesium.Cartesian3(t.minVerticesValue.x, t.minVerticesValue.y, t.minVerticesValue.z)),
                    new Uint16Array(n.typedArray.buffer, n.typedArray.byteOffset, n.typedArray.byteLength / 2))
                  : new Float32Array(n.typedArray.buffer, n.typedArray.byteOffset, n.typedArray.byteLength / 4);
                let u = [];
                for (let e = 0; e < t.verticesCount; e++)
                  Cesium.Cartesian3.fromArray(h, r * e, o),
                    s && ((o = Cesium.Cartesian3.multiplyByScalar(o, a, o)), (o = Cesium.Cartesian3.add(o, l, o))),
                    u.push(Cesium.Cartesian3.clone(o));
                return (
                  Cesium.BoundingSphere.fromPoints(u, i), Cesium.BoundingSphere.transform(i, e, i), (u.length = 0), i
                );
              })(f, c);
          a[d] = TMap3D.S3M.S3MContentFactory[o.fileType]({
            layer: o,
            vertexPackage: f,
            arrIndexPackage: y,
            pickInfo: v,
            modelMatrix: c,
            boundingVolume: m,
            material: e,
          });
        }
      }
      if (!Cesium.defined(s.boundingVolume)) {
        let e = [];
        for (var t in a) a.hasOwnProperty(t) && e.push(a[t].boundingVolume);
        s.boundingVolume = Cesium.BoundingSphere.fromBoundingSpheres(e);
      }
      s.geoMap = a;
    }
    (TMap3D.S3M.S3MContentParser = function () {}).parse = function (e, t) {
      if (Cesium.defined(t))
        return (function (i, o, n) {
          var r = o.groupNode;
          let s = [];
          for (let t = 0, e = r.pageLods.length; t < e; t++) {
            let e = {};
            var a = r.pageLods[t];
            (e.rangeMode = a.rangeMode), (e.rangeDataList = a.childTile), (e.rangeList = a.rangeList);
            var l = a.boundingSphere.center,
              h = a.boundingSphere.radius;
            '' !== e.rangeDataList
              ? (e.boundingVolume = { sphere: { center: new Cesium.Cartesian3(l.x, l.y, l.z), radius: h } })
              : (e.isLeafTile = !0),
              u(i, o, n, a, e),
              s.push(e);
          }
          return s;
        })(
          e,
          t,
          (function (o, n) {
            let r = {};
            var s = n.materials.material;
            for (let e = 0, t = s.length; e < t; e++) {
              var a = s[e].material,
                l = a.id;
              let i = new TMap3D.S3M.MaterialPass();
              r[l] = i;
              l = a.ambient;
              i.ambientColor = new Cesium.Color(l.r, l.g, l.b, l.a);
              l = a.diffuse;
              i.diffuseColor = new Cesium.Color(l.r, l.g, l.b, l.a);
              l = a.specular;
              (i.specularColor = new Cesium.Color(l.r, l.g, l.b, l.a)),
                (i.shininess = a.shininess),
                (i.bTransparentSorting = a.transparentsorting);
              var h = a.textureunitstates,
                u = h.length;
              for (let t = 0; t < u; t++) {
                var c = h[t].textureunitstate,
                  p = c.id,
                  d = 0 === c.addressmode.u ? Cesium.TextureWrap.REPEAT : Cesium.TextureWrap.CLAMP_TO_EDGE,
                  m = 0 === c.addressmode.v ? Cesium.TextureWrap.REPEAT : Cesium.TextureWrap.CLAMP_TO_EDGE;
                i.texMatrix = Cesium.Matrix4.unpack(c.texmodmatrix);
                let e = n.texturePackage[p];
                Cesium.defined(e) &&
                  0 < e.imageBuffer.byteLength &&
                  ((e.wrapS = d), (e.wrapT = m), (p = new TMap3D.S3M.DDSTexture(o, p, e)), i.textures.push(p));
              }
            }
            return r;
          })(e.context, t),
        );
    };
  })(),
  (function () {
    var e = (TMap3D.S3M.S3MLayerCache = function () {
      (this._list = new Cesium.DoublyLinkedList()), (this._sentinel = this._list.add()), (this._trimTiles = !1);
    });
    (e.prototype.reset = function () {
      this._list.splice(this._list.tail, this._sentinel);
    }),
      (e.prototype.touch = function (e) {
        e = e.cacheNode;
        Cesium.defined(e) && this._list.splice(this._sentinel, e);
      }),
      (e.prototype.add = function (e) {
        Cesium.defined(e.cacheNode) || (e.cacheNode = this._list.add(e));
      }),
      (e.prototype.unloadTile = function (e, t, i) {
        var o = t.cacheNode;
        Cesium.defined(o) && (this._list.remove(o), (t.cacheNode = void 0), i(e, t));
      }),
      (e.prototype.unloadTiles = function (t, i) {
        var e = this._trimTiles;
        this._trimTiles = !1;
        var o = this._list,
          n = 1024 * t.maximumMemoryUsage * 1024,
          r = this._sentinel;
        let s = o.head;
        for (; s !== r && (t.totalMemoryUsageInBytes > n || e); ) {
          let e = s.item;
          (s = s.next), e.isDestroyed() && console.log(e), this.unloadTile(t, e, i);
        }
      }),
      (e.prototype.trim = function () {
        this._trimTiles = !0;
      });
  })(),
  (function () {
    function a(e, t) {
      return e.distanceToCamera - t.distanceToCamera;
    }
    function o(t, i, o) {
      for (; i.length; ) {
        let e = i.pop();
        e.visible &&
          ((n = t),
          (r = e),
          (s = o),
          r.touchedFrame !== s.frameNumber && (n._cache.touch(r), (r.touchedFrame = s.frameNumber)),
          e.canTraverse()
            ? (function (e, t, i) {
                let o,
                  n = e.children;
                var r = n.length;
                for (o = 0; o < r; ++o) n[o].updateVisibility(i);
                for (n.sort(a), o = 0; o < r; ++o) {
                  var s = n[o];
                  s.visible && t.push(s);
                }
              })(e, i, o)
            : ((n = t),
              (r = e),
              (s = o),
              r.renderable && (n._selectedTiles.push(r), (r.selectedFrame = s.frameNumber)),
              (n = t),
              (r = e),
              (s = o),
              r.requestedFrame === s.frameNumber ||
                r.contentState !== TMap3D.S3M.ContentState.UNLOADED ||
                r.isLeafTile ||
                (n._requestTiles.push(r), (r.requestedFrame = s.frameNumber))));
      }
      var n, r, s;
    }
    (TMap3D.S3M.S3MLayerScheduler = function () {
      this._stack = [];
    }).prototype.scheduler = function (e, t) {
      (e._requestTiles.length = 0), (e._selectedTiles.length = 0);
      var i = this._stack;
      !(function (i, o, n) {
        for (let t = (o.length = 0), e = i._rootTiles.length; t < e; t++) {
          let e = i._rootTiles[t];
          e.updateVisibility(n), e.visible && o.push(e);
        }
      })(e, i, t),
        o(e, i, t);
    };
  })(),
  (function () {
    var e = (TMap3D.S3M.S3ModelParser = function () {});
    let u = { SV_Unkown: 0, SV_Standard: 1, SV_Compressed: 2 };
    function d(e, t, i) {
      t = t.getUint32(i, !0);
      i += Uint32Array.BYTES_PER_ELEMENT;
      e = new Uint8Array(e, i, t);
      return { string: Cesium.getStringFromTypedArray(e), bytesOffset: (i += t) };
    }
    function h(t, i, o, e) {
      let n = {};
      (n.rangeList = i.getFloat32(o, !0)),
        (o += Float32Array.BYTES_PER_ELEMENT),
        (n.rangeMode = i.getUint16(o, !0)),
        (o += Uint16Array.BYTES_PER_ELEMENT);
      let r = {};
      (r.x = i.getFloat64(o, !0)),
        (o += Float64Array.BYTES_PER_ELEMENT),
        (r.y = i.getFloat64(o, !0)),
        (o += Float64Array.BYTES_PER_ELEMENT),
        (r.z = i.getFloat64(o, !0)),
        (o += Float64Array.BYTES_PER_ELEMENT);
      var s = i.getFloat64(o, !0);
      (o += Float64Array.BYTES_PER_ELEMENT), (n.boundingSphere = { center: r, radius: s });
      s = d(t, i, o);
      let a = s.string;
      o = s.bytesOffset;
      s = a.indexOf('Geometry');
      -1 !== s && ((s = a.substring(s)), (a = a.replace(s, ''))), (n.childTile = a), (n.geodes = []);
      var l = i.getUint32(o, !0);
      o += Uint32Array.BYTES_PER_ELEMENT;
      for (let e = 0; e < l; e++)
        o = (function (t, i, o, e) {
          let n = {},
            r = [],
            s = new Array(16);
          for (let e = 0; e < 16; e++) (s[e] = i.getFloat64(o, !0)), (o += Float64Array.BYTES_PER_ELEMENT);
          (n.matrix = s), (n.skeletonNames = r);
          var a = i.getUint32(o, !0);
          o += Uint32Array.BYTES_PER_ELEMENT;
          for (let e = 0; e < a; e++) {
            var l = d(t, i, o);
            r.push(l.string), (o = l.bytesOffset);
          }
          return e.push(n), o;
        })(t, i, o, n.geodes);
      return e.push(n), o;
    }
    function c(e, t, i, o) {
      var n = t.getUint32(i, !0);
      if (((o.verticesCount = n), (i += Uint32Array.BYTES_PER_ELEMENT) <= 0)) return i;
      var r = t.getUint16(i, !0);
      i += Uint16Array.BYTES_PER_ELEMENT;
      (t = t.getUint16(i, !0)), (t = r * Float32Array.BYTES_PER_ELEMENT);
      i += Uint16Array.BYTES_PER_ELEMENT;
      (n = n * r * Float32Array.BYTES_PER_ELEMENT), (e = new Uint8Array(e, i, n));
      i += n;
      let s = o.vertexAttributes,
        a = o.attrLocation;
      return (
        (a.aPosition = s.length),
        s.push({
          index: a.aPosition,
          typedArray: e,
          componentsPerAttribute: r,
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          offsetInBytes: 0,
          strideInBytes: t,
          normalize: !1,
        }),
        i
      );
    }
    function p(e, t, i, o) {
      var n = t.getUint32(i, !0);
      if (((i += Uint32Array.BYTES_PER_ELEMENT), n <= 0)) return i;
      var r = t.getUint16(i, !0);
      i += Uint16Array.BYTES_PER_ELEMENT;
      t = t.getUint16(i, !0);
      i += Uint16Array.BYTES_PER_ELEMENT;
      (n = n * r * Float32Array.BYTES_PER_ELEMENT), (e = new Uint8Array(e, i, n));
      i += n;
      let s = o.vertexAttributes,
        a = o.attrLocation;
      return (
        (a.aNormal = s.length),
        s.push({
          index: a.aNormal,
          typedArray: e,
          componentsPerAttribute: r,
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          offsetInBytes: 0,
          strideInBytes: t,
          normalize: !1,
        }),
        i
      );
    }
    function m(t, i, o, e) {
      var n = i.getUint32(o, !0);
      o += Uint32Array.BYTES_PER_ELEMENT;
      var r = e.verticesCount;
      let s;
      if (0 < n) {
        i.getUint16(o, !0);
        (o += Uint16Array.BYTES_PER_ELEMENT), (o += 2 * Uint8Array.BYTES_PER_ELEMENT);
        n = n * Uint8Array.BYTES_PER_ELEMENT * 4;
        let e = new Uint8Array(t, o, n);
        (s = e.slice(0, n)), (o += n);
      } else {
        s = new Uint8Array(4 * r);
        for (let e = 0; e < r; e++) (s[4 * e] = 255), (s[4 * e + 1] = 255), (s[4 * e + 2] = 255), (s[4 * e + 3] = 255);
      }
      let a = e.vertexAttributes,
        l = e.attrLocation;
      return (
        (l.aColor = a.length),
        a.push({
          index: l.aColor,
          typedArray: s,
          componentsPerAttribute: 4,
          componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
          offsetInBytes: 0,
          strideInBytes: 4,
          normalize: !0,
        }),
        (e.vertexColor = s),
        o
      );
    }
    function f(e, t, i, o) {
      var n = t.getUint32(i, !0);
      if (((i += Uint32Array.BYTES_PER_ELEMENT), n <= 0)) return i;
      t.getUint16(i, !0);
      (i += Uint16Array.BYTES_PER_ELEMENT), (i += 2 * Uint8Array.BYTES_PER_ELEMENT);
      (n = n * Uint8Array.BYTES_PER_ELEMENT * 4), (e = new Uint8Array(e, i, n));
      i += n;
      let r = o.vertexAttributes,
        s = o.attrLocation;
      return (
        (s.aSecondColor = r.length),
        r.push({
          index: s.aSecondColor,
          typedArray: e,
          componentsPerAttribute: 4,
          componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
          offsetInBytes: 0,
          strideInBytes: 4,
          normalize: !0,
        }),
        i
      );
    }
    function y(o, n, r, s) {
      var e = n.getUint16(r, !0);
      (r += Uint16Array.BYTES_PER_ELEMENT), (r += Uint16Array.BYTES_PER_ELEMENT);
      for (let i = 0; i < e; i++) {
        var a = n.getUint32(r, !0);
        r += Uint32Array.BYTES_PER_ELEMENT;
        var l = n.getUint16(r, !0);
        r += Uint16Array.BYTES_PER_ELEMENT;
        n.getUint16(r, !0);
        r += Uint16Array.BYTES_PER_ELEMENT;
        var h = a * l * Float32Array.BYTES_PER_ELEMENT,
          a = new Uint8Array(o, r, h);
        r += h;
        h = 'aTexCoord' + i;
        let e = s.vertexAttributes,
          t = s.attrLocation;
        (t[h] = e.length),
          e.push({
            index: t[h],
            typedArray: a,
            componentsPerAttribute: l,
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            offsetInBytes: 0,
            strideInBytes: l * Float32Array.BYTES_PER_ELEMENT,
            normalize: !1,
          });
      }
      return r;
    }
    function v(i, t, o, n) {
      var r = t.getUint16(o, !0);
      (o += Uint16Array.BYTES_PER_ELEMENT), (o += Uint16Array.BYTES_PER_ELEMENT);
      let s = n.vertexAttributes,
        a = n.attrLocation;
      for (let e = 0; e < r; e++) {
        var l = t.getUint32(o, !0);
        o += Uint32Array.BYTES_PER_ELEMENT;
        var h = t.getUint16(o, !0);
        o += Uint16Array.BYTES_PER_ELEMENT;
        t.getUint16(o, !0);
        o += Uint16Array.BYTES_PER_ELEMENT;
        var u = l * h * Float32Array.BYTES_PER_ELEMENT;
        if (17 === h || 29 === h) {
          let e = new Uint8Array(i, o, u);
          (n.instanceCount = l), (n.instanceMode = h), (n.instanceBuffer = e), (n.instanceIndex = 1);
          var c = e.slice(0, h * l * 4);
          n.vertexColorInstance = c;
          let t;
          17 === h
            ? ((t = 17 * Float32Array.BYTES_PER_ELEMENT),
              (a.uv2 = s.length),
              s.push({
                index: a.uv2,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 0,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv3 = s.length),
              s.push({
                index: a.uv3,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 4 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv4 = s.length),
              s.push({
                index: a.uv4,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 8 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv5 = s.length),
              s.push({
                index: a.uv5,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 12 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv6 = s.length),
              s.push({
                index: a.uv6,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
                normalize: !0,
                offsetInBytes: 16 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }))
            : 29 === h &&
              ((t = 29 * Float32Array.BYTES_PER_ELEMENT),
              (a.uv1 = s.length),
              s.push({
                index: a.uv1,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 0,
                strideInBytes: t,
                instanceDivisor: 1,
                byteLength: u,
              }),
              (a.uv2 = s.length),
              s.push({
                index: a.uv2,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 4 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv3 = s.length),
              s.push({
                index: a.uv3,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 8 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv4 = s.length),
              s.push({
                index: a.uv4,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 12 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv5 = s.length),
              s.push({
                index: a.uv5,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 16 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv6 = s.length),
              s.push({
                index: a.uv6,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 20 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv7 = s.length),
              s.push({
                index: a.uv7,
                componentsPerAttribute: 3,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: !1,
                offsetInBytes: 24 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv8 = s.length),
              s.push({
                index: a.uv8,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
                normalize: !0,
                offsetInBytes: 27 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }),
              (a.uv9 = s.length),
              s.push({
                index: a.uv9,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
                normalize: !0,
                offsetInBytes: 28 * Float32Array.BYTES_PER_ELEMENT,
                strideInBytes: t,
                instanceDivisor: 1,
              }));
        } else {
          var p = l * h;
          n.instanceBounds = new Float32Array(p);
          for (let e = 0; e < p; e++) n.instanceBounds[e] = t.getFloat32(o, !0);
        }
        o += u;
      }
      return o;
    }
    function C(e, t, i, o) {
      var n = t.getUint32(i, !0);
      return (
        (o.compressOptions = n),
        (i += Uint32Array.BYTES_PER_ELEMENT),
        (i = (
          (n & TMap3D.S3M.VertexCompressOptions.SVC_Vertex) === TMap3D.S3M.VertexCompressOptions.SVC_Vertex
            ? function (e, t, i, o) {
                var n = t.getUint32(i, !0);
                if (((o.verticesCount = n), (i += Uint32Array.BYTES_PER_ELEMENT) <= 0)) return i;
                var r = t.getUint16(i, !0);
                (i += Uint16Array.BYTES_PER_ELEMENT), t.getUint16(i, !0);
                var s = r * Int16Array.BYTES_PER_ELEMENT;
                i += Uint16Array.BYTES_PER_ELEMENT;
                var a = t.getFloat32(i, !0);
                i += Float32Array.BYTES_PER_ELEMENT;
                let l = {};
                (l.x = t.getFloat32(i, !0)),
                  (i += Float32Array.BYTES_PER_ELEMENT),
                  (l.y = t.getFloat32(i, !0)),
                  (i += Float32Array.BYTES_PER_ELEMENT),
                  (l.z = t.getFloat32(i, !0)),
                  (i += Float32Array.BYTES_PER_ELEMENT),
                  (l.w = t.getFloat32(i, !0)),
                  (i += Float32Array.BYTES_PER_ELEMENT),
                  (o.vertCompressConstant = a),
                  (o.minVerticesValue = l),
                  (n = n * r * Int16Array.BYTES_PER_ELEMENT),
                  (e = new Uint8Array(e, i, n)),
                  (i += n);
                let h = o.vertexAttributes,
                  u = o.attrLocation;
                return (
                  (u.aPosition = h.length),
                  h.push({
                    index: u.aPosition,
                    typedArray: e,
                    componentsPerAttribute: r,
                    componentDatatype: Cesium.ComponentDatatype.SHORT,
                    offsetInBytes: 0,
                    strideInBytes: s,
                    normalize: !1,
                  }),
                  i
                );
              }
            : c
        )(e, t, i, o)),
        (i = f(
          e,
          t,
          (i = m(
            e,
            t,
            (i = (
              (n & TMap3D.S3M.VertexCompressOptions.SVC_Normal) === TMap3D.S3M.VertexCompressOptions.SVC_Normal
                ? function (e, t, i, o) {
                    var n = t.getUint32(i, !0);
                    if (((i += Uint32Array.BYTES_PER_ELEMENT), n <= 0)) return i;
                    t.getUint16(i, !0),
                      (i += Uint16Array.BYTES_PER_ELEMENT),
                      (t = t.getUint16(i, !0)),
                      (i += Uint16Array.BYTES_PER_ELEMENT),
                      (n = 2 * n * Int16Array.BYTES_PER_ELEMENT),
                      (e = new Uint8Array(e, i, n)),
                      (i += n);
                    let r = o.vertexAttributes,
                      s = o.attrLocation;
                    return (
                      (s.aNormal = r.length),
                      r.push({
                        index: s.aNormal,
                        typedArray: e,
                        componentsPerAttribute: 2,
                        componentDatatype: Cesium.ComponentDatatype.SHORT,
                        offsetInBytes: 0,
                        strideInBytes: t,
                        normalize: !1,
                      }),
                      i
                    );
                  }
                : p
            )(e, t, i, o)),
            o,
          )),
          o,
        )),
        (i = (
          (n & TMap3D.S3M.VertexCompressOptions.SVC_TexutreCoord) === TMap3D.S3M.VertexCompressOptions.SVC_TexutreCoord
            ? function (n, r, s, a) {
                (a.texCoordCompressConstant = []), (a.minTexCoordValue = []);
                var e = r.getUint16(s, !0);
                (s += Uint16Array.BYTES_PER_ELEMENT), (s += Uint16Array.BYTES_PER_ELEMENT);
                for (let o = 0; o < e; o++) {
                  var l = r.getUint8(s, !0);
                  (s += Uint8Array.BYTES_PER_ELEMENT), (s += 3 * Uint8Array.BYTES_PER_ELEMENT);
                  var h = r.getUint32(s, !0);
                  s += Uint32Array.BYTES_PER_ELEMENT;
                  var u = r.getUint16(s, !0);
                  s += Uint16Array.BYTES_PER_ELEMENT;
                  r.getUint16(s, !0);
                  s += Uint16Array.BYTES_PER_ELEMENT;
                  var c = r.getFloat32(s, !0);
                  (s += Float32Array.BYTES_PER_ELEMENT), a.texCoordCompressConstant.push(c);
                  let e = {};
                  (e.x = r.getFloat32(s, !0)),
                    (s += Float32Array.BYTES_PER_ELEMENT),
                    (e.y = r.getFloat32(s, !0)),
                    (s += Float32Array.BYTES_PER_ELEMENT),
                    (e.z = r.getFloat32(s, !0)),
                    (s += Float32Array.BYTES_PER_ELEMENT),
                    (e.w = r.getFloat32(s, !0)),
                    (s += Float32Array.BYTES_PER_ELEMENT),
                    a.minTexCoordValue.push(e);
                  var p = h * u * Int16Array.BYTES_PER_ELEMENT,
                    d = new Uint8Array(n, s, p),
                    c = (s += p) % 4;
                  0 != c && (s += 4 - c);
                  c = 'aTexCoord' + o;
                  let t = a.vertexAttributes,
                    i = a.attrLocation;
                  (i[c] = t.length),
                    t.push({
                      index: i[c],
                      typedArray: d,
                      componentsPerAttribute: u,
                      componentDatatype: Cesium.ComponentDatatype.SHORT,
                      offsetInBytes: 0,
                      strideInBytes: u * Int16Array.BYTES_PER_ELEMENT,
                      normalize: !1,
                    }),
                    l &&
                      ((p = h * Float32Array.BYTES_PER_ELEMENT),
                      (h = new Uint8Array(n, s, p)),
                      (s += p),
                      (a.texCoordZMatrix = !0),
                      (c = 'aTexCoordZ' + o),
                      (i[c] = t.length),
                      t.push({
                        index: i[c],
                        typedArray: h,
                        componentsPerAttribute: 1,
                        componentDatatype: Cesium.ComponentDatatype.FLOAT,
                        offsetInBytes: 0,
                        strideInBytes: Float32Array.BYTES_PER_ELEMENT,
                        normalize: !1,
                      }));
                }
                return s;
              }
            : y
        )(e, t, i, o)),
        (n & TMap3D.S3M.VertexCompressOptions.SVC_TexutreCoordIsW) ===
          TMap3D.S3M.VertexCompressOptions.SVC_TexutreCoordIsW && (o.textureCoordIsW = !0),
        (i = v(e, t, i, o))
      );
    }
    function g(t, i, o, n) {
      i.getUint32(o, !0);
      o += Uint32Array.BYTES_PER_ELEMENT;
      var r = i.getUint32(o, !0);
      o += Uint32Array.BYTES_PER_ELEMENT;
      for (let e = 0; e < r; e++) {
        var s = d(t, i, o),
          a = s.string,
          l = (o = s.bytesOffset) % 4;
        0 != l && (o += 4 - l);
        var h = i.getUint32(o, !0);
        o += Int32Array.BYTES_PER_ELEMENT;
        s = { vertexAttributes: [], attrLocation: {}, instanceCount: 0, instanceMode: 0, instanceIndex: -1 };
        h === u.SV_Standard
          ? (o = v(t, i, y(t, i, f(t, i, m(t, i, p(t, i, c(t, i, o, (l = s)), l), l), l), l), l))
          : h === u.SV_Compressed && (o = C(t, i, o, s));
        h = [];
        (o = (function (o, n, r, s) {
          var t = n.getUint32(r, !0);
          r += Uint32Array.BYTES_PER_ELEMENT;
          for (let e = 0; e < t; e++) {
            let i = {};
            var a = n.getUint32(r, !0);
            r += Uint32Array.BYTES_PER_ELEMENT;
            var l = n.getUint8(r, !0);
            r += Uint8Array.BYTES_PER_ELEMENT;
            n.getUint8(r, !0);
            r += Uint8Array.BYTES_PER_ELEMENT;
            var h = n.getUint8(r, !0);
            if (((r += Uint8Array.BYTES_PER_ELEMENT), (r += Uint8Array.BYTES_PER_ELEMENT), 0 < a)) {
              let e = null,
                t;
              1 === l || 3 === l
                ? ((t = a * Uint32Array.BYTES_PER_ELEMENT), (e = new Uint8Array(o, r, t)))
                : ((t = a * Uint16Array.BYTES_PER_ELEMENT), (e = new Uint8Array(o, r, t)), a % 2 != 0 && (t += 2)),
                (i.indicesTypedArray = e),
                (r += t);
            }
            (i.indicesCount = a), (i.indexType = l), (i.primitiveType = h);
            let t = [];
            var u = n.getUint32(r, !0);
            r += Uint32Array.BYTES_PER_ELEMENT;
            for (let e = 0; e < u; e++) {
              var c = d(o, n, r),
                p = c.string;
              (r = c.bytesOffset), t.push(p), (i.materialCode = p);
            }
            0 != r % 4 && (r += 4 - (r % 4)), s.push(i);
          }
          return r;
        })(t, i, o, h)),
          (n[a] = { vertexPackage: s, arrIndexPackage: h });
      }
      return (o += i.getUint32(o, !0)), (o += Uint32Array.BYTES_PER_ELEMENT);
    }
    e.parseBuffer = function (e) {
      var t = 0;
      let i = { version: void 0, groupNode: void 0, geoPackage: {}, matrials: void 0, texturePackage: {} },
        o = new DataView(e);
      (i.version = o.getFloat32(0, !0)), (t += Float32Array.BYTES_PER_ELEMENT);
      o.getUint32(t, !0);
      t += Uint32Array.BYTES_PER_ELEMENT;
      var n = ((a = t), (a = new Uint8Array(e, t)), pako.inflate(a).buffer);
      o = new DataView(n);
      var r,
        s,
        a,
        t = 0,
        l = o.getUint32(0, !0);
      return (
        (t += Uint32Array.BYTES_PER_ELEMENT),
        (t = (function (t, i, o, e) {
          let n = {};
          var r = [];
          i.getUint32(o, !0), (o += Uint32Array.BYTES_PER_ELEMENT);
          var s = i.getUint32(o, !0);
          o += Uint32Array.BYTES_PER_ELEMENT;
          for (let e = 0; e < s; e++) o = h(t, i, o, r);
          n.pageLods = r;
          var a = o % 4;
          return 0 != a && (o += 4 - a), (e.groupNode = n), o;
        })(n, o, t, i)),
        (t = g(n, o, t, i.geoPackage)),
        (t = (function (t, i, o, n) {
          i.getUint32(o, !0), (o += Uint32Array.BYTES_PER_ELEMENT);
          var r = i.getUint32(o, !0);
          o += Uint32Array.BYTES_PER_ELEMENT;
          for (let e = 0; e < r; e++) {
            var s = d(t, i, o),
              a = s.string,
              l = (o = s.bytesOffset) % 4;
            0 != l && (o += 4 - l);
            i.getUint32(o, !0);
            o += Uint32Array.BYTES_PER_ELEMENT;
            var h = i.getUint32(o, !0);
            o += Uint32Array.BYTES_PER_ELEMENT;
            var u = i.getUint32(o, !0);
            o += Uint32Array.BYTES_PER_ELEMENT;
            var c = i.getUint32(o, !0);
            o += Uint32Array.BYTES_PER_ELEMENT;
            var p = i.getUint32(o, !0);
            o += Uint32Array.BYTES_PER_ELEMENT;
            s = i.getUint32(o, !0);
            o += Uint32Array.BYTES_PER_ELEMENT;
            l = new Uint8Array(t, o, p);
            (o += p),
              (n[a] = {
                id: a,
                width: h,
                height: u,
                compressType: c,
                nFormat: s,
                internalFormat: Cesium.PixelFormat.RGBA_DXT5,
                imageBuffer: l,
              });
          }
          return o;
        })(n, o, t, i.texturePackage)),
        (r = n),
        (s = o),
        (e = t),
        (a = i),
        (s = s.getUint32(e, !0)),
        (e += Uint32Array.BYTES_PER_ELEMENT),
        (r = new Uint8Array(r, e, s)),
        (r = Cesium.getStringFromTypedArray(r)),
        (e += s),
        (a.materials = JSON.parse(r)),
        (function (t, o, n, e, r) {
          if (1 == (1 & e)) {
            o.getUint32(n, !0);
            n += Uint32Array.BYTES_PER_ELEMENT;
            var i = o.getUint32(n, !0);
            n += Uint32Array.BYTES_PER_ELEMENT;
            for (let e = 0; e < i; e++) {
              var s = d(t, o, n),
                a = s.string;
              n = s.bytesOffset;
              var l = o.getUint32(n, !0);
              n += Uint32Array.BYTES_PER_ELEMENT;
              let i = {};
              r[a].pickInfo = i;
              var h = r[a].vertexPackage.instanceIndex;
              for (let e = 0; e < l; e++) {
                var u = o.getUint32(n, !0);
                n += Uint32Array.BYTES_PER_ELEMENT;
                var c = o.getUint32(n, !0);
                n += Uint32Array.BYTES_PER_ELEMENT;
                let t = [];
                for (let e = 0; e < c; e++) {
                  var p = o.getUint32(n, !0);
                  n += Uint32Array.BYTES_PER_ELEMENT;
                  let e = 1;
                  -1 === h && ((e = o.getUint32(n, !0)), (n += Uint32Array.BYTES_PER_ELEMENT)),
                    t.push({ vertexColorOffset: p, vertexColorCount: e });
                }
                i[u] = t;
              }
            }
          }
        })(n, o, e, l, i.geoPackage),
        i
      );
    };
  })(),
  (function () {
    var e = (TMap3D.S3M.S3MTile = function (e, t, i, o, n, r, s) {
      (this.layer = e),
        (this.parent = t),
        (this.fileName = o),
        (this.isLeafTile = Cesium.defaultValue(s, !1)),
        (this.boundingVolume = this.createBoundingVolume(i, e.modelMatrix));
      let a = Cesium.Resource.createIfNeeded(e._baseResource);
      if (Cesium.defined(t)) this.baseUri = t.baseUri;
      else {
        let e = new Cesium.Resource(o);
        this.baseUri = e.getBaseUri();
      }
      (this.contentResource = a.getDerivedResource({ url: o })),
        (this.serverKey = Cesium.RequestScheduler.getServerKey(this.contentResource.getUrlComponent())),
        (this.request = void 0),
        (this.cacheNode = void 0),
        (this.distanceToCamera = 0),
        (this.pixel = 0),
        (this.visibilityPlaneMask = 0),
        (this.visible = !1),
        (this.children = []),
        (this.lodRangeData = n),
        (this.renderEntityMap = r),
        (this.contentState = TMap3D.S3M.ContentState.UNLOADED),
        (this.readerable = !1),
        (this.touchedFrame = 0),
        (this.requestedFrame = 0),
        (this.selectedFrame = 0),
        (this.priority = 0);
    });
    Object.defineProperties(TMap3D.S3M.S3MTile.prototype, {
      renderable: {
        get: function () {
          return Cesium.defined(this.renderEntityMap);
        },
      },
    });
    let r = new Cesium.Cartesian3();
    function o(e) {
      return e.boundingVolume;
    }
    (e.prototype.createBoundingVolume = function (e, t) {
      return this.isLeafTile
        ? new Cesium.TileBoundingSphere(e.center, e.radius)
        : Cesium.defined(e.sphere)
        ? ((i = e.sphere),
          (o = t),
          (n = Cesium.Cartesian3.clone(i.center)),
          (i = i.radius),
          (n = Cesium.Matrix4.multiplyByPoint(o, n, n)),
          (o = Cesium.Matrix4.getScale(o, r)),
          (i *= Cesium.Cartesian3.maximumComponent(o)),
          new Cesium.TileBoundingSphere(n, i))
        : Cesium.defined(e.box)
        ? ((i = e.box),
          (e = t),
          (t = new Cesium.Cartesian3(i.min.x, i.min.y, i.min.z)),
          Cesium.Matrix4.multiplyByPoint(e, t, t),
          (i = new Cesium.Cartesian3(i.max.x, i.max.y, i.max.z)),
          Cesium.Matrix4.multiplyByPoint(e, i, i),
          (t = Cesium.BoundingSphere.fromCornerPoints(t, i, new Cesium.BoundingSphere())),
          (i = t.center),
          (t = t.radius),
          (e = Cesium.Matrix4.getScale(e, r)),
          (t *= Cesium.Cartesian3.maximumComponent(e)),
          new Cesium.TileBoundingSphere(i, t))
        : void 0;
      var i, o, n;
    }),
      (e.prototype.canTraverse = function () {
        return (
          0 !== this.children.length &&
          !this.isLeafTile &&
          (!Cesium.defined(this.lodRangeData) || this.pixel > this.lodRangeData)
        );
      }),
      (e.prototype.getPixel = function (e) {
        var t = this.boundingVolume,
          i = t.radius,
          o = t.center,
          t = Cesium.Cartesian3.distance(e.camera.positionWC, o),
          o = e.context.drawingBufferHeight,
          e = 0.5 * e.camera.frustum._fovy;
        return (((0.5 * o) / Math.tan(e)) * i) / t;
      }),
      (e.prototype.distanceToTile = function (e) {
        let t = o(this);
        return t.distanceToCamera(e);
      }),
      (e.prototype.visibility = function (e, t) {
        var i = o(this);
        return e.cullingVolume.computeVisibilityWithPlaneMask(i, t);
      }),
      (e.prototype.updateVisibility = function (e) {
        var t = this.parent,
          t = Cesium.defined(t) ? t.visibilityPlaneMask : Cesium.CullingVolume.MASK_INDETERMINATE;
        (this.distanceToCamera = this.distanceToTile(e)),
          (this.pixel = this.getPixel(e)),
          (this.visibilityPlaneMask = this.visibility(e, t)),
          (this.visible = this.visibilityPlaneMask !== Cesium.CullingVolume.MASK_OUTSIDE);
      }),
      (e.prototype.requestContent = function () {
        let i = this;
        var e, t;
        this.layer;
        let o = this.contentResource.clone(),
          n = new Cesium.Request({
            throttle: !0,
            throttleByServer: !0,
            type: Cesium.RequestType.TILES3D,
            priorityFunction:
              ((e = this),
              function () {
                return e.priority;
              }),
            url: o.url,
            serverKey: this.serverKey,
          });
        (this.request = n), (o.request = n);
        let r = o.fetchArrayBuffer();
        if (!Cesium.defined(r)) return !1;
        (this.contentState = TMap3D.S3M.ContentState.LOADING), (this.contentReadyPromise = Cesium.when.defer());
        let s =
          ((t = this),
          function (e) {
            (t.contentState = TMap3D.S3M.ContentState.FAILED), t.contentReadyPromise.reject(e);
          });
        return (
          r
            .then(function (e) {
              var t;
              i.isDestroyed()
                ? s()
                : ((t = TMap3D.S3M.S3ModelParser.parseBuffer(e)),
                  (e = TMap3D.S3M.S3MContentParser.parse(i.layer, t)),
                  (function (t, i) {
                    var o = t.layer,
                      n = i.length;
                    for (let e = 0; e < n; e++) {
                      var r = i[e],
                        s = r.boundingVolume,
                        a = r.rangeDataList,
                        a = t.baseUri + a,
                        l = r.rangeList,
                        h = r.geoMap,
                        r = new TMap3D.S3M.S3MTile(o, t, s, a, l, h, r.isLeafTile);
                      t.children.push(r), t.layer._cache.add(r);
                    }
                  })(i, e),
                  (i.selectedFrame = 0),
                  (i.contentState = TMap3D.S3M.ContentState.READY),
                  i.contentReadyPromise.resolve(t));
            })
            .otherwise(function (e) {
              n.state !== Cesium.RequestState.CANCELLED ? s(e) : (i.contentState = TMap3D.S3M.ContentState.UNLOADED);
            }),
          !0
        );
      }),
      (e.prototype.update = function (e) {
        let t = this.renderEntityMap;
        for (var i in t) t.hasOwnProperty(i) && t[i].update(e);
      }),
      (e.prototype.free = function () {
        for (let t = 0, e = this.children.length; t < e; t++) {
          let e = this.children[t];
          e.destroy();
        }
        (this.children.length = 0), (this.contentState = TMap3D.S3M.ContentState.UNLOADED);
      }),
      (e.prototype.isDestroyed = function () {
        return !1;
      }),
      (e.prototype.destroy = function () {
        for (var e in this.renderEntityMap) this.renderEntityMap.hasOwnProperty(e) && this.renderEntityMap[e].destroy();
        this.renderEntityMap = void 0;
        for (let t = 0, e = this.children.length; t < e; t++) {
          let e = this.children[t];
          e.destroy();
        }
        return (this.children.length = 0), Cesium.destroyObject(this);
      });
  })(),
  (function () {
    var e = (TMap3D.S3M.S3MTilesLayer = function (e) {
      (e = Cesium.defaultValue(e, Cesium.defaultValue.EMPTY_OBJECT)),
        Cesium.Check.defined('options.url', e.url),
        Cesium.Check.defined('options.context', e.context),
        (this.context = e.context),
        (this._url = void 0),
        (this._basePath = void 0),
        (this._baseResource = void 0),
        (this.modelMatrix = void 0),
        (this.fileType = void 0),
        (this._position = void 0),
        (this._rectangle = void 0),
        (this._rootTiles = []),
        (this._schuduler = new TMap3D.S3M.S3MLayerScheduler()),
        (this._requestTiles = []),
        (this._selectedTiles = []),
        (this._cache = new TMap3D.S3M.S3MLayerCache()),
        (this._maximumMemoryUsage = -1),
        (this._totalMemoryUsageInBytes = 0),
        (this._readyPromise = Cesium.when.defer()),
        this.loadConfig(e.url);
    });
    function t(e, t) {
      return e.priority - t.priority;
    }
    function i(e, t) {}
    Object.defineProperties(TMap3D.S3M.S3MTilesLayer.prototype, {
      ready: {
        get: function () {
          return 0 < this._rootTiles.length;
        },
      },
      readyPromise: {
        get: function () {
          return this._readyPromise;
        },
      },
      rectangle: {
        get: function () {
          return this._rectangle;
        },
      },
      totalMemoryUsageInBytes: {
        get: function () {
          return this._totalMemoryUsageInBytes;
        },
        set: function (e) {
          this._totalMemoryUsageInBytes = e;
        },
      },
      maximumMemoryUsage: {
        get: function () {
          return this._maximumMemoryUsage;
        },
        set: function (e) {
          this._maximumMemoryUsage = e;
        },
      },
    }),
      (e.prototype.loadConfig = function (e) {
        let s = this;
        Cesium.when(e)
          .then(function (e) {
            let t = Cesium.Resource.createIfNeeded(e);
            return (e = t.getBaseUri(!0)), (s._url = t.url), (s._basePath = e), (s._baseResource = t), t.fetchJson();
          })
          .then(function (i) {
            var e = i.extensions;
            s.fileType = e['s3m:FileType'];
            var t = i.position.x,
              o = i.position.y,
              e = i.position.z;
            (s._position = Cesium.Cartesian3.fromDegrees(t, o, e)),
              (s.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(s._position)),
              (s._rectangle = Cesium.Rectangle.fromDegrees(
                i.geoBounds.left,
                i.geoBounds.bottom,
                i.geoBounds.right,
                i.geoBounds.top,
              ));
            for (let e = 0, t = i.tiles.length; e < t; e++) {
              var n = i.tiles[e].url,
                r = { box: i.tiles[e].boundingbox },
                n = new TMap3D.S3M.S3MTile(s, void 0, r, n);
              s._cache.add(n), s._rootTiles.push(n);
            }
            s._readyPromise.resolve(s);
          })
          .otherwise(function (e) {
            s._readyPromise.reject(e);
          });
      }),
      (e.prototype.loadXMLConfig = function (e) {
        let c = this;
        Cesium.when(e)
          .then(function (e) {
            let t = Cesium.Resource.createIfNeeded(e);
            return (e = t.getBaseUri(!0)), (c._url = t.url), (c._basePath = e), (c._baseResource = t), t.fetchXML();
          })
          .then(function (e) {
            e.extensions;
            c.fileType = e.getElementsByTagName('sml:FileType')[0].textContent;
            var t = parseFloat(e.getElementsByTagName('sml:Position')[0].getElementsByTagName('sml:X')[0].textContent),
              i = parseFloat(e.getElementsByTagName('sml:Position')[0].getElementsByTagName('sml:Y')[0].textContent),
              o = parseFloat(e.getElementsByTagName('sml:Position')[0].getElementsByTagName('sml:Z')[0].textContent);
            (c._position = Cesium.Cartesian3.fromDegrees(t, i, o)),
              (c.modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(c._position));
            var n = parseFloat(e.getElementsByTagName('sml:Bounds')[0].getElementsByTagName('sml:Left')[0].textContent),
              t = parseFloat(e.getElementsByTagName('sml:Bounds')[0].getElementsByTagName('sml:Bottom')[0].textContent),
              i = parseFloat(e.getElementsByTagName('sml:Bounds')[0].getElementsByTagName('sml:Right')[0].textContent),
              o = parseFloat(e.getElementsByTagName('sml:Bounds')[0].getElementsByTagName('sml:Top')[0].textContent);
            c._rectangle = Cesium.Rectangle.fromDegrees(n, t, i, o);
            var r = Array.from(e.getElementsByTagName('sml:Files'));
            for (let e = 0, t = r.length; e < t; e++) {
              var s = r[e].getElementsByTagName('sml:FileName')[0].textContent,
                a = parseFloat(
                  r[e].getElementsByTagName('sml:BoundingSphere')[0].getElementsByTagName('sml:CenterX')[0].textContent,
                ),
                l = parseFloat(
                  r[e].getElementsByTagName('sml:BoundingSphere')[0].getElementsByTagName('sml:CenterY')[0].textContent,
                ),
                h = parseFloat(
                  r[e].getElementsByTagName('sml:BoundingSphere')[0].getElementsByTagName('sml:CenterZ')[0].textContent,
                ),
                u = parseFloat(
                  r[e].getElementsByTagName('sml:BoundingSphere')[0].getElementsByTagName('sml:Radius')[0].textContent,
                ),
                u = { box: { min: { x: a - u, y: l - u, z: h - u }, max: { x: a + u, y: l + u, z: h + u } } },
                s = new TMap3D.S3M.S3MTile(c, void 0, u, 'data/path/' + s);
              c._cache.add(s), c._rootTiles.push(s);
            }
            c._readyPromise.resolve(c);
          })
          .otherwise(function (e) {
            c._readyPromise.reject(e);
          });
      }),
      (e.prototype.prePassesUpdate = function (e) {
        this.ready && e.newFrame && this._cache.reset();
      }),
      (e.prototype.update = function (e) {
        this.ready &&
          (this._schuduler.scheduler(this, e),
          (function (e) {
            let i = e._requestTiles;
            var o = i.length;
            i.sort(t);
            for (let t = 0; t < o; ++t) {
              let e = i[t];
              e.requestContent();
            }
          })(this),
          (function (e, t) {
            let i = e._selectedTiles;
            var o = i.length;
            for (let e = 0; e < o; e++) i[e].update(t);
          })(this, e),
          (e = this)._cache.unloadTiles(e, i));
      });
  })(),
  (function () {
    function i(e) {
      (e = Cesium.defaultValue(e, Cesium.defaultValue.EMPTY_OBJECT)),
        (this._primitive = e.primitive),
        (this._boundingVolume = e.boundingVolume),
        (this._orientedBoundingBox = e.orientedBoundingBox),
        (this._cull = Cesium.defaultValue(e.cull, !0)),
        (this._modelMatrix = e.modelMatrix),
        (this._primitiveType = Cesium.defaultValue(e.primitiveType, Cesium.PrimitiveType.TRIANGLES)),
        (this._vertexArray = e.vertexArray),
        (this._count = e.count),
        (this._offset = Cesium.defaultValue(e.offset, 0)),
        (this._instanceCount = Cesium.defaultValue(e.instanceCount, 0)),
        (this._shaderProgram = e.shaderProgram),
        (this._uniformMap = e.uniformMap),
        (this._renderState = e.renderState),
        (this._framebuffer = e.framebuffer),
        (this._pass = e.pass),
        (this._executeInClosestFrustum = Cesium.defaultValue(e.executeInClosestFrustum, !1)),
        (this._owner = e.owner),
        (this._debugShowBoundingVolume = Cesium.defaultValue(e.debugShowBoundingVolume, !1)),
        (this._debugOverlappingFrustums = 0),
        (this._castShadows = Cesium.defaultValue(e.castShadows, !1)),
        (this._receiveShadows = Cesium.defaultValue(e.receiveShadows, !1)),
        (this.dirty = !0),
        (this.lastDirtyTime = 0),
        (this.name = 'FeDrawCommand');
    }
    Object.defineProperties(i.prototype, {
      boundingVolume: {
        get: function () {
          return this._boundingVolume;
        },
        set: function (e) {
          this._boundingVolume !== e && ((this._boundingVolume = e), (this.dirty = !0));
        },
      },
      orientedBoundingBox: {
        get: function () {
          return this._orientedBoundingBox;
        },
        set: function (e) {
          this._orientedBoundingBox !== e && ((this._orientedBoundingBox = e), (this.dirty = !0));
        },
      },
      cull: {
        get: function () {
          return this._cull;
        },
        set: function (e) {
          this._cull !== e && ((this._cull = e), (this.dirty = !0));
        },
      },
      modelMatrix: {
        get: function () {
          return this._modelMatrix;
        },
        set: function (e) {
          this._modelMatrix !== e && ((this._modelMatrix = e), (this.dirty = !0));
        },
      },
      primitiveType: {
        get: function () {
          return this._primitiveType;
        },
        set: function (e) {
          this._primitiveType !== e && ((this._primitiveType = e), (this.dirty = !0));
        },
      },
      vertexArray: {
        get: function () {
          return this._vertexArray;
        },
        set: function (e) {
          this._vertexArray !== e && ((this._vertexArray = e), (this.dirty = !0));
        },
      },
      count: {
        get: function () {
          return this._count;
        },
        set: function (e) {
          this._count !== e && ((this._count = e), (this.dirty = !0));
        },
      },
      offset: {
        get: function () {
          return this._offset;
        },
        set: function (e) {
          this._offset !== e && ((this._offset = e), (this.dirty = !0));
        },
      },
      instanceCount: {
        get: function () {
          return this._instanceCount;
        },
        set: function (e) {
          this._instanceCount !== e && ((this._instanceCount = e), (this.dirty = !0));
        },
      },
      shaderProgram: {
        get: function () {
          return this._shaderProgram;
        },
        set: function (e) {
          this._shaderProgram !== e && ((this._shaderProgram = e), (this.dirty = !0));
        },
      },
      castShadows: {
        get: function () {
          return this._castShadows;
        },
        set: function (e) {
          this._castShadows !== e && ((this._castShadows = e), (this.dirty = !0));
        },
      },
      receiveShadows: {
        get: function () {
          return this._receiveShadows;
        },
        set: function (e) {
          this._receiveShadows !== e && ((this._receiveShadows = e), (this.dirty = !0));
        },
      },
      uniformMap: {
        get: function () {
          return this._uniformMap;
        },
        set: function (e) {
          this._uniformMap !== e && ((this._uniformMap = e), (this.dirty = !0));
        },
      },
      renderState: {
        get: function () {
          return this._renderState;
        },
        set: function (e) {
          this._renderState !== e && ((this._renderState = e), (this.dirty = !0));
        },
      },
      framebuffer: {
        get: function () {
          return this._framebuffer;
        },
        set: function (e) {
          this._framebuffer !== e && ((this._framebuffer = e), (this.dirty = !0));
        },
      },
      pass: {
        get: function () {
          return this._pass;
        },
        set: function (e) {
          this._pass !== e && ((this._pass = e), (this.dirty = !0));
        },
      },
      executeInClosestFrustum: {
        get: function () {
          return this._executeInClosestFrustum;
        },
        set: function (e) {
          this._executeInClosestFrustum !== e && ((this._executeInClosestFrustum = e), (this.dirty = !0));
        },
      },
      owner: {
        get: function () {
          return this._owner;
        },
        set: function (e) {
          this._owner !== e && ((this._owner = e), (this.dirty = !0));
        },
      },
      debugShowBoundingVolume: {
        get: function () {
          return this._debugShowBoundingVolume;
        },
        set: function (e) {
          this._debugShowBoundingVolume !== e && ((this._debugShowBoundingVolume = e), (this.dirty = !0));
        },
      },
      debugOverlappingFrustums: {
        get: function () {
          return this._debugOverlappingFrustums;
        },
        set: function (e) {
          this._debugOverlappingFrustums !== e && ((this._debugOverlappingFrustums = e), (this.dirty = !0));
        },
      },
    }),
      (i.shallowClone = function (e, t) {
        if (Cesium.defined(e))
          return (
            ((t = !Cesium.defined(t) ? new i() : t)._primitive = e.primitive),
            (t._boundingVolume = e._boundingVolume),
            (t._orientedBoundingBox = e._orientedBoundingBox),
            (t._cull = e._cull),
            (t._modelMatrix = e._modelMatrix),
            (t._primitiveType = e._primitiveType),
            (t._vertexArray = e._vertexArray),
            (t._count = e._count),
            (t._offset = e._offset),
            (t._instanceCount = e._instanceCount),
            (t._shaderProgram = e._shaderProgram),
            (t._uniformMap = e._uniformMap),
            (t._renderState = e._renderState),
            (t._framebuffer = e._framebuffer),
            (t._pass = e._pass),
            (t._executeInClosestFrustum = e._executeInClosestFrustum),
            (t._owner = e._owner),
            (t._debugShowBoundingVolume = e._debugShowBoundingVolume),
            (t._debugOverlappingFrustums = e._debugOverlappingFrustums),
            (t._castShadows = e._castShadows),
            (t._receiveShadows = e._receiveShadows),
            (t.dirty = !0),
            (t.lastDirtyTime = 0),
            t
          );
      });
    var p,
      o =
        'precision mediump float;\nuniform sampler2D u_baseTexture;\nvarying vec4 colour;\nvarying vec2 texCoord;\nvoid main()\n{\n\tvec4 color = texture2D( u_baseTexture, texCoord);\n\tif( color.a > 0.1 ){\n\t\tgl_FragColor = colour * color;\n\t}else{\n\t\tdiscard;\n\t}\n}',
      n =
        'attribute vec3 v_position;\nattribute vec2 v_texCoord;\nuniform mat4 u_modelViewMatrix;\nuniform mat4 u_projMatrix;\nuniform float u_inversePeriod;\nuniform vec4 u_particleColour;\nuniform float u_particleSize;\nuniform float u_simulationTime;\nuniform float u_deltaSimulationTime;\nuniform float u_startTime;\nvarying vec4 colour;\nvarying vec2 texCoord;\nvoid main()\n{\n\tfloat offset = v_position.z;\n\tfloat startTime = u_startTime;\n\ttexCoord = v_texCoord;\n\tvec4 v_previous = vec4(v_position,1.0);\n\tv_previous.z = fract((u_simulationTime - startTime) * u_inversePeriod - offset);\n\tvec4 v_current =  v_previous;\n\tv_current.z += (u_deltaSimulationTime * u_inversePeriod);\n\tcolour = u_particleColour;\n\tvec4 v1 = u_modelViewMatrix * v_current;\n\tvec4 v2 = u_modelViewMatrix * v_previous;\n\tvec3 dv = v2.xyz - v1.xyz;\n\tvec2 dv_normalized = normalize(dv.xy);\n\tdv.xy += dv_normalized * u_particleSize;\n\tvec2 dp = vec2( -dv_normalized.y, dv_normalized.x ) * u_particleSize;\n\tfloat area = length(dv.xy);\n\tcolour.a = 0.05 + (u_particleSize) / area;\n\tv1.xyz += dv * texCoord.y;\n\tv1.xy += dp * texCoord.x;\n\tgl_Position = u_projMatrix * v1;\n}';
    function e(e) {
      (this._pass = Cesium.Pass.OPAQUE), (this._receiveShadows = !1);
      var t = new Cesium.BoundingSphere(new Cesium.Cartesian3(), 63781370);
      (this._drawCommand = new Cesium.FeDrawCommand({
        primitive: this,
        pass: this._pass,
        receiveShadows: this._receiveShadows,
        boundingVolume: t,
      })),
        (e = Cesium.defaultValue(e, Cesium.defaultValue.EMPTY_OBJECT)),
        (this._gl = void 0),
        (this._us = void 0),
        (this._vao = void 0),
        (this._reverse = Cesium.defaultValue(e.reverse, !1)),
        (this._isGeometryCreate = !1),
        (this._positionBuffer = void 0),
        (this._texCoordBuffer = void 0),
        (this._indexBuffer = void 0),
        (this._shaderProgram = void 0),
        (this._uModelViewMat = void 0),
        (this._uProjMat = void 0),
        (this._uInversePeriod = void 0),
        (this._uParticleColour = void 0),
        (this._uParticleSize = void 0),
        (this._uSimulationTime = void 0),
        (this._uDeltaSimulationTime = void 0),
        (this._uStartTime = void 0),
        (this._uSpotLightTex = void 0),
        (this._renderState = new Cesium.RenderState()),
        (this._renderState.depthTest.enabled = !1),
        (this._renderState.blending.enabled = !0),
        (this._renderState.depthMask = !1),
        (this._renderState.blending.functionSourceRgb = Cesium.WebGLConstants.SRC_ALPHA),
        (this._renderState.blending.functionDestinationRgb = Cesium.WebGLConstants.ONE_MINUS_SRC_ALPHA),
        (this._maxParticlesPerCell = Cesium.defaultValue(e.maxParticlesPerCell, 1024)),
        (this._vertexNum = 4 * this._maxParticlesPerCell),
        (this._elementNum = 6 * this._maxParticlesPerCell),
        (this._camPosition = new Cesium.Cartesian3(0, 0, 0)),
        (this._camSpherePos = void 0),
        (this._numParticlesPerCell = 0),
        (this._positionArr = void 0),
        (this._texCoordArr = void 0),
        (this._wind = new Cesium.Cartesian3()),
        (this._particleSpeed = 0),
        (this._particleSize = 0),
        (this._particleColor = new Cesium.Cartesian4()),
        (this._maximumParticleDensity = 0),
        (this._cellSize = new Cesium.Cartesian3()),
        (this._nearTransition = 0),
        (this._farTransition = 0),
        (this._useFarLineSegments = !1),
        (this._dirty = !0),
        (this._period = 0),
        (this._du = new Cesium.Cartesian3()),
        (this._dv = new Cesium.Cartesian3()),
        (this._dw = new Cesium.Cartesian3()),
        (this._inverse_du = new Cesium.Cartesian3()),
        (this._inverse_dv = new Cesium.Cartesian3()),
        (this._inverse_dw = new Cesium.Cartesian3()),
        (this._spotLightTex = void 0),
        (this._origin = new Cesium.Cartesian3(0, 0, 0)),
        (this._previousFrameTime = void 0),
        (this._deltaFrameTime = void 0),
        (this._matrixArr = new Array()),
        (this._worldMat = new Cesium.Matrix4()),
        (this._cullingVolume = void 0),
        (this._visibleHeight = Cesium.defaultValue(e.visibleHeight, 5e3)),
        (this._density = Cesium.defaultValue(e.density, 0.5)),
        (this._speed = Cesium.defaultValue(e.speed, 1)),
        (this._url = Cesium.defaultValue(e.url, void 0)),
        (this._show = Cesium.defaultValue(e.show, !0)),
        (this._scope = Cesium.defaultValue(e.scope, void 0)),
        Cesium.defined(this._scope)
          ? (this._rectangle = Cesium.Rectangle.fromDegrees(
              this._scope[0],
              this._scope[1],
              this._scope[2],
              this._scope[3],
            ))
          : (this._rectangle = Cesium.Rectangle.fromDegrees(-180, -90, 180, 90)),
        (this._type = Cesium.defaultValue(e.type, 0)),
        (1 === this._type ? a : l)(this, this._density);
    }
    function r(e) {
      if (((e._matrixArr = []), Cesium.defined(e._camSpherePos) && !(e._camSpherePos.height > e._visibleHeight))) {
        var t = e._cellSize.x * e._cellSize.y * e._cellSize.z;
        e._numParticlesPerCell = parseInt(e._maximumParticleDensity * t);
        var i = new Cesium.Cartesian3(0, 0, 0),
          o = new Cesium.Cartesian3();
        Cesium.Cartesian3.subtract(i, e._origin, o);
        var n = Cesium.Cartesian3.dot(o, e._inverse_dw),
          r = new Cesium.Cartesian3();
        Cesium.Cartesian3.multiplyByScalar(e._dw, n, r);
        var s = new Cesium.Cartesian3();
        Cesium.Cartesian3.subtract(i, r, s);
        var a = new Cesium.Cartesian3();
        Cesium.Cartesian3.subtract(s, e._origin, a);
        for (
          var t = Cesium.Cartesian3.dot(a, e._inverse_du),
            o = Cesium.Cartesian3.dot(a, e._inverse_dv),
            r = e._farTransition * e._inverse_du.x,
            s = e._farTransition * e._inverse_dv.y,
            a = parseInt(Math.floor(t - r)),
            l = parseInt(Math.floor(o - s)),
            h = parseInt(Math.floor(n - 1)),
            u = parseInt(Math.ceil(t + r)),
            c = parseInt(Math.ceil(o + s)),
            p = parseInt(Math.ceil(n + 1)),
            d = a;
          d <= u;
          ++d
        )
          for (var m = l; m <= c; ++m)
            for (var f = h; f <= p; ++f) {
              var y = 0.43 * d + 0.64 * m;
              (v = e),
                (C = i),
                (g = d),
                (w = m),
                (E = f),
                (P = y = (y - Math.floor(y)) * e._period),
                (M = e._reverse),
                (y = void 0),
                (y = M ? -1 : 1),
                (M = new Cesium.Cartesian3()),
                (g = new Cesium.Cartesian3(g * v._du.x, w * v._dv.y, y * (E + 1) * v._dw.z)),
                Cesium.Cartesian3.add(v._origin, g, M),
                (w = new Cesium.Cartesian3(v._du.x, v._dv.y, -1 * y * v._dw.z)),
                (E = new Cesium.Cartesian3()),
                Cesium.Cartesian3.multiplyByScalar(w, 0.5, E),
                (g = new Cesium.Cartesian3()),
                Cesium.Cartesian3.add(M, E, g),
                (function (e, t, i, o) {
                  var n = new Cesium.Cartesian3(i.x, i.y, i.z + o.z),
                    o = new Cesium.Cartesian3(i.x + o.x, i.y + o.y, i.z),
                    i = new Cesium.Cartesian3();
                  return (
                    Cesium.Cartesian3.subtract(n, t, i),
                    (n = new Cesium.Cartesian3()),
                    Cesium.Cartesian3.subtract(o, t, n),
                    (o = new Array()).push(i),
                    o.push(n),
                    (n = Cesium.BoundingSphere.fromPoints(o)),
                    (o = new Cesium.Cartesian3()),
                    Cesium.Cartesian3.add(n.center, t, o),
                    (t = new Cesium.Cartesian4(o.x, o.y, o.z, 1)),
                    Cesium.Matrix4.multiplyByVector(e._worldMat, t, t),
                    (o.x = t.x),
                    (o.y = t.y),
                    (o.z = t.z),
                    (n.center = o),
                    (o = Cesium.Cartographic.fromCartesian(o)),
                    Cesium.Rectangle.contains(e._rectangle, o) &&
                      e._cullingVolume.computeVisibility(n) !== Cesium.Intersect.OUTSIDE
                  );
                })(v, g, M, w) &&
                  ((E = new Cesium.Cartesian3()),
                  Cesium.Cartesian3.subtract(g, C, E),
                  (g = Cesium.Cartesian3.magnitude(E)),
                  (C = Cesium.Matrix4.fromScale(w)),
                  (E = Cesium.Matrix4.fromTranslation(M)),
                  (w = v._us.view),
                  (M = new Cesium.Matrix4()),
                  Cesium.Matrix4.multiply(E, C, M),
                  (C = new Cesium.Matrix4()),
                  Cesium.Matrix4.multiply(v._worldMat, M, C),
                  (M = new Cesium.Matrix4()),
                  Cesium.Matrix4.multiply(w, C, M),
                  ((C = new Object()).depth = g),
                  (C.startTime = P),
                  (C.modelview = M),
                  v._matrixArr.push(C));
            }
      }
      var v, C, g, w, E, P, M;
    }
    function d(l, h) {
      var u;
      l._url
        ? (((u = new Image()).onload = function () {
            (l._spotLightTex = h.createTexture()),
              h.bindTexture(h.TEXTURE_2D, l._spotLightTex),
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MAG_FILTER, h.LINEAR),
              h.texParameteri(h.TEXTURE_2D, h.TEXTURE_MIN_FILTER, h.LINEAR);
            var e = u.width,
              t = u.height,
              i = new Uint8Array(e * t * 4),
              o = 0,
              n = document.createElement('canvas').getContext('2d');
            n.drawImage(u, 0, 0);
            for (var r = n.getImageData(0, 0, e, t).data, s = r.length, a = 0; a < s; ++a) i[o++] = r[a];
            h.texImage2D(h.TEXTURE_2D, 0, h.RGBA, e, t, 0, h.RGBA, h.UNSIGNED_BYTE, i, 0),
              h.bindTexture(h.TEXTURE_2D, null);
          }),
          (u.src = l._url))
        : (function (e, t) {
            (e._spotLightTex = t.createTexture()),
              t.bindTexture(t.TEXTURE_2D, e._spotLightTex),
              t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
              t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR);
            for (
              var i = new Uint8Array(4096),
                o = 0,
                n = new Cesium.Cartesian4(1, 1, 1, 1),
                r = new Cesium.Cartesian4(1, 1, 1, 0),
                s = 0;
              s < 32;
              ++s
            )
              for (var a = 0; a < 32; ++a) {
                var l = (2 / 32) * (a - 15.5),
                  h = (2 / 32) * (s - 15.5),
                  u = 1 - Math.sqrt(l * l + h * h);
                u < 0 && (u = 0),
                  (l = new Cesium.Cartesian4()),
                  Cesium.Cartesian4.multiplyByScalar(n, u, l),
                  (h = new Cesium.Cartesian4()),
                  Cesium.Cartesian4.multiplyByScalar(r, 1 - u, h),
                  (u = new Cesium.Cartesian4()),
                  Cesium.Cartesian4.add(l, h, u),
                  (i[o++] = 255 * u.x),
                  (i[o++] = 255 * u.y),
                  (i[o++] = 255 * u.z),
                  (i[o++] = 255 * u.w);
              }
            t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, 32, 32, 0, t.RGBA, t.UNSIGNED_BYTE, i, 0),
              t.bindTexture(t.TEXTURE_2D, null);
          })(l, h);
    }
    function s(e) {
      e._dirty = !1;
      var t = e._cellSize.x,
        i = e._cellSize.y,
        o = e._cellSize.z;
      (e._period = Math.abs(e._cellSize.z / e._particleSpeed)),
        (e._du.x = t),
        (e._du.y = 0),
        (e._du.z = 0),
        (e._dv.x = 0),
        (e._dv.y = i),
        (e._dv.z = 0),
        (e._dw.x = 0),
        (e._dw.y = 0),
        (e._dw.z = o),
        (e._inverse_du.x = 1 / t),
        (e._inverse_du.y = 0),
        (e._inverse_du.z = 0),
        (e._inverse_dv.x = 0),
        (e._inverse_dv.y = 1 / i),
        (e._inverse_dv.z = 0),
        (e._inverse_dw.x = 0),
        (e._inverse_dw.y = 0),
        (e._inverse_dw.z = 1 / o);
    }
    function a(e, t) {
      (e._wind.x = 0),
        (e._wind.y = 0),
        (e._wind.z = 0),
        (e._particleSpeed = -2 - 5 * e._speed),
        (e._particleSize = 0.01 + 0.02 * t);
      var i = new Cesium.Cartesian4(0.1, 0.1, 0.1, 1),
        o = new Cesium.Cartesian4();
      Cesium.Cartesian3.multiplyByScalar(i, t, o),
        (i = new Cesium.Cartesian4(0.6, 0.6, 0.6, 1)),
        Cesium.Cartesian3.subtract(i, o, e._particleColor),
        (e._maximumParticleDensity = 8.5 * t),
        (e._cellSize.x = 5 / (0.25 + t)),
        (e._cellSize.y = 5 / (0.25 + t)),
        (e._cellSize.z = 5),
        (e._nearTransition = 25),
        (e._farTransition = 80 - 60 * Math.sqrt(t)),
        (e._useFarLineSegments = !1),
        (e._dirty = !0),
        s(e);
    }
    function l(e, t) {
      (e._wind.x = 0),
        (e._wind.y = 0),
        (e._wind.z = 0),
        (e._particleSpeed = -0.5 - 0.5 * e._speed),
        (e._particleSize = 0.02 + 0.01 * t);
      var i = new Cesium.Cartesian4(0.1, 0.1, 0.1, 1),
        o = new Cesium.Cartesian4();
      Cesium.Cartesian3.multiplyByScalar(i, t, o),
        (i = new Cesium.Cartesian4(1, 1, 1, 1)),
        Cesium.Cartesian3.subtract(i, o, e._particleColor),
        (e._maximumParticleDensity = 8.2 * t),
        (e._cellSize.x = 5 / (0.25 + t)),
        (e._cellSize.y = 5 / (0.25 + t)),
        (e._cellSize.z = 5),
        (e._nearTransition = 25),
        (e._farTransition = 80 - 60 * Math.sqrt(t)),
        (e._useFarLineSegments = !1),
        (e._dirty = !0),
        s(e);
    }
    var t = !(i.prototype.execute = function (e, t) {
      Cesium.defined(this._primitive) && this._primitive.draw(e, t);
    });
    function h(e) {
      for (var t = e.split('.'), i = 0, o = t.length; i < o; ++i) t[i] = parseInt(t[i], 10);
      return t;
    }
    var u = {};
    function m() {
      var e;
      return (
        Cesium.defined(t) ||
          ((t = !1),
          'Microsoft Internet Explorer' === u.appName
            ? null !== (e = /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(u.userAgent)) &&
              ((t = !0), (internetExplorerVersionResult = h(e[1])))
            : 'Netscape' === u.appName &&
              null !== (e = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(u.userAgent)) &&
              ((t = !0), (internetExplorerVersionResult = h(e[1])))),
        t
      );
    }
    function f(e, t) {
      m() || (e.vertexArrayObject && ((t._vao = e.glCreateVertexArray()), e.glBindVertexArray(t._vao)));
      var i = e._gl;
      (t._positionBuffer = i.createBuffer()),
        i.bindBuffer(i.ARRAY_BUFFER, t._positionBuffer),
        (t._positionArr = (function (e) {
          for (var t = new Float32Array(3 * e._vertexNum), i = 0, o = 0; o < e._maxParticlesPerCell; ++o)
            for (var n = Math.random(), r = Math.random(), s = Math.random(), a = 0; a < 4; ++a)
              (t[i++] = n), (t[i++] = r), (t[i++] = s);
          return t;
        })(t)),
        i.bufferData(i.ARRAY_BUFFER, t._positionArr, i.STATIC_DRAW),
        (t._texCoordBuffer = i.createBuffer()),
        i.bindBuffer(i.ARRAY_BUFFER, t._texCoordBuffer),
        (t._texCoordArr = (function (e) {
          for (var t = new Float32Array(2 * e._vertexNum), i = 0, o = 0; o < e._maxParticlesPerCell; ++o)
            (t[i++] = 0),
              (t[i++] = 0),
              (t[i++] = 1),
              (t[i++] = 0),
              (t[i++] = 0),
              (t[i++] = 1),
              (t[i++] = 1),
              (t[i++] = 1);
          return t;
        })(t)),
        i.bufferData(i.ARRAY_BUFFER, t._texCoordArr, i.STATIC_DRAW),
        i.bindBuffer(i.ARRAY_BUFFER, null),
        (t._indexBuffer = i.createBuffer()),
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t._indexBuffer),
        (t = (function (e) {
          for (var t = new Uint32Array(e._elementNum), i = 0, o = 0; o < e._maxParticlesPerCell; ++o)
            (t[i++] = 4 * o + 1),
              (t[i++] = 4 * o + 0),
              (t[i++] = 4 * o + 2),
              (t[i++] = 4 * o + 1),
              (t[i++] = 4 * o + 2),
              (t[i++] = 4 * o + 3);
          return t;
        })(t)),
        i.bufferData(i.ELEMENT_ARRAY_BUFFER, t, i.STATIC_DRAW),
        i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, null),
        m() || (e.vertexArrayObject && e.glBindVertexArray(null));
    }
    function y(e, t) {
      if (
        ((t = t ? ((i = e.createShader(e.VERTEX_SHADER)), n) : ((i = e.createShader(e.FRAGMENT_SHADER)), o)),
        e.shaderSource(i, t),
        e.compileShader(i),
        e.getShaderParameter(i, e.COMPILE_STATUS))
      )
        return i;
      var i = e.getShaderInfoLog(i);
      alert(i);
    }
    function v(e, t, i, o) {
      var n = e._currentRenderState,
        r = e._currentPassState;
      (e._currentRenderState = t), (e._currentPassState = i), Cesium.RenderState.partialApply(e._gl, n, t, r, i, o);
    }
    function C(e, t) {
      return e.depth - t.depth;
    }
    Object.defineProperties(e.prototype, {
      show: {
        get: function () {
          return this._show;
        },
        set: function (e) {
          this._show = e;
        },
      },
      visibleHeight: {
        get: function () {
          return this._visibleHeight;
        },
        set: function (e) {
          this._visibleHeight = e;
        },
      },
      density: {
        get: function () {
          return this._density;
        },
        set: function (e) {
          (this._density = e), (1 === this._type ? a : l)(this, this._density);
        },
      },
      speed: {
        get: function () {
          return this._speed;
        },
        set: function (e) {
          this._speed = e;
        },
      },
      scope: {
        get: function () {
          return this._scope;
        },
        set: function (e) {
          (this._scope = e),
            (this._rectangle = Rectangle.fromDegrees(this._scope[0], this._scope[1], this._scope[2], this._scope[3]));
        },
      },
      reverse: {
        get: function () {
          return this._reverse;
        },
        set: function (e) {
          this._reverse = e;
        },
      },
    }),
      (e.prototype.update = function (e) {
        var t;
        this._show &&
          ((this._us = e.context._us),
          (this._cullingVolume = e.cullingVolume),
          (t = this),
          Cesium.Cartesian3.clone(e.camera.position, t._camPosition),
          (t._camSpherePos = Cesium.Ellipsoid.WGS84.cartesianToCartographic(t._camPosition)),
          (t._worldMat = Cesium.Transforms.eastNorthUpToFixedFrame(t._camPosition)),
          (function (e) {
            var t = Cesium.getTimestamp() / 1e3;
            Cesium.defined(e._previousFrameTime) || (e._previousFrameTime = t),
              (e._deltaFrameTime = t - e._previousFrameTime);
            var i = new Cesium.Cartesian3();
            Cesium.Cartesian3.multiplyByScalar(e._wind, e._deltaFrameTime, i),
              Cesium.Cartesian3.add(e._origin, i, e._origin),
              (e._previousFrameTime = t);
          })(this),
          r(this),
          e.commandList.push(this._drawCommand));
      }),
      'undefined' != typeof WebGLRenderingContext && (p = [Cesium.WebGLConstants.BACK]),
      (e.prototype.destroy = function () {
        return Cesium.destroyObject(this);
      }),
      (e.prototype.draw = function (e, t) {
        if (Cesium.defined(e)) {
          var i = e._gl;
          if (Cesium.defined(i))
            if (
              ((this._gl = i),
              this._isGeometryCreate || (f(e, this), (this._isGeometryCreate = !0)),
              Cesium.defined(this._spotLightTex) || d(this, i),
              Cesium.defined(this._shaderProgram))
            ) {
              if (this._isGeometryCreate) {
                i.useProgram(this._shaderProgram),
                  (c = (l = this)._gl),
                  Cesium.defined(l._uSpotLightTex) && c.uniform1i(l._uSpotLightTex, 0),
                  Cesium.defined(l._uInversePeriod) && c.uniform1f(l._uInversePeriod, 1 / l._period),
                  Cesium.defined(l._uParticleColour) &&
                    c.uniform4f(
                      l._uParticleColour,
                      l._particleColor.x,
                      l._particleColor.y,
                      l._particleColor.z,
                      l._particleColor.w,
                    ),
                  Cesium.defined(l._uParticleSize) && c.uniform1f(l._uParticleSize, l._particleSize),
                  Cesium.defined(l._uProjMat) &&
                    ((h = l._us.projection),
                    (u = new Float32Array(16)),
                    Cesium.Matrix4.toArray(h, u),
                    c.uniformMatrix4fv(l._uProjMat, !1, u)),
                  Cesium.defined(l._uSimulationTime) && c.uniform1f(l._uSimulationTime, l._previousFrameTime),
                  Cesium.defined(l._uDeltaSimulationTime) && c.uniform1f(l._uDeltaSimulationTime, l._deltaFrameTime),
                  (c = e),
                  (l = t.framebuffer) !== c._currentFramebuffer &&
                    ((c._currentFramebuffer = l),
                    (a = p),
                    Cesium.defined(l)
                      ? (l._bind(), (a = l._getActiveColorAttachments()))
                      : (l = c._gl).bindFramebuffer(l.FRAMEBUFFER, null),
                    c.drawBuffers && c.glDrawBuffers(a));
                (c = e._currentRenderState), (a = e._currentPassState);
                v(e, this._renderState, t, !1),
                  m() || (e.vertexArrayObject && e.glBindVertexArray(this._vao)),
                  (t = i.getAttribLocation(this._shaderProgram, 'v_position')),
                  i.enableVertexAttribArray(t),
                  i.bindBuffer(i.ARRAY_BUFFER, this._positionBuffer),
                  i.vertexAttribPointer(t, 3, i.FLOAT, !1, 0, 0),
                  (t = i.getAttribLocation(this._shaderProgram, 'v_texCoord')),
                  i.enableVertexAttribArray(t),
                  i.bindBuffer(i.ARRAY_BUFFER, this._texCoordBuffer),
                  i.vertexAttribPointer(t, 2, i.FLOAT, !1, 0, 0),
                  i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this._indexBuffer),
                  i.activeTexture(i.TEXTURE0),
                  i.bindTexture(i.TEXTURE_2D, this._spotLightTex),
                  this._matrixArr.sort(C);
                for (var o = 0; o < this._matrixArr.length; ++o) {
                  (r = (n = this)._matrixArr[o]),
                    (s = void 0),
                    Cesium.defined(n._uModelViewMat) &&
                      ((s = new Float32Array(16)),
                      Cesium.Matrix4.toArray(r.modelview, s),
                      n._gl.uniformMatrix4fv(n._uModelViewMat, !1, s)),
                    Cesium.defined(n._uStartTime) && n._gl.uniform1f(n._uStartTime, r.startTime);
                  r =
                    this._numParticlesPerCell < this._maxParticlesPerCell
                      ? this._numParticlesPerCell
                      : this._maxParticlesPerCell;
                  i.drawElements(i.TRIANGLES, 6 * r, i.UNSIGNED_INT, 0);
                }
                i.bindBuffer(i.ARRAY_BUFFER, null),
                  i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, null),
                  m() || (e.glBindVertexArray(null), i.bindTexture(i.TEXTURE_2D, null)),
                  v(e, c, a, !1);
              }
            } else
              (e = (t = this)._gl),
                (c = y(e, !0)),
                (a = y(e, !1)),
                (t._shaderProgram = e.createProgram()),
                e.attachShader(t._shaderProgram, c),
                e.attachShader(t._shaderProgram, a),
                e.linkProgram(t._shaderProgram),
                e.getProgramParameter(t._shaderProgram, e.LINK_STATUS) ||
                  ((e = e.getProgramInfoLog(t._shaderProgram)), alert(e), (t._shaderProgram = void 0)),
                (t = (e = this)._gl),
                (e._uModelViewMat = t.getUniformLocation(e._shaderProgram, 'u_modelViewMatrix')),
                (e._uProjMat = t.getUniformLocation(e._shaderProgram, 'u_projMatrix')),
                (e._uInversePeriod = t.getUniformLocation(e._shaderProgram, 'u_inversePeriod')),
                (e._uParticleColour = t.getUniformLocation(e._shaderProgram, 'u_particleColour')),
                (e._uParticleSize = t.getUniformLocation(e._shaderProgram, 'u_particleSize')),
                (e._uSimulationTime = t.getUniformLocation(e._shaderProgram, 'u_simulationTime')),
                (e._uDeltaSimulationTime = t.getUniformLocation(e._shaderProgram, 'u_deltaSimulationTime')),
                (e._uStartTime = t.getUniformLocation(e._shaderProgram, 'u_startTime')),
                (e._uSpotLightTex = t.getUniformLocation(e._shaderProgram, 'u_baseTexture'));
        }
        var n, r, s, a, l, h, u, c;
      }),
      (Cesium.FeDrawCommand = i),
      (Cesium.FePrecipitation = e);
  })(),
  (function () {
    function t(e) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e);
    }
    (t.prototype.getType = function (e) {
      return 'WallGradients';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.WallGradientsImage),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.WallGradientsMaterialProperty = t),
      (Cesium.Material.WallGradientsType = 'WallGradients'),
      (Cesium.Material.WallGradientsImage = TMap3D.BaseUtils.getHostPath() + '/TMap/effects/wallgradients.png'),
      (Cesium.Material.WallGradientsSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n{\n     czm_material material = czm_getDefaultMaterial(materialInput);\n     vec2 st = materialInput.st;\n     vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));\n     material.alpha = colorImage.a * color.a;\n     material.diffuse =  2.5 * color.rgb  ;\n     return material;\n }'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.WallGradientsType, {
        fabric: {
          type: Cesium.Material.WallGradientsType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 0.5), image: Cesium.Material.WallGradientsImage, time: 0 },
          source: Cesium.Material.WallGradientsSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e, t) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e),
        (this.duration = t),
        (this._time = new Date().getTime());
    }
    (t.prototype.getType = function (e) {
      return 'WallTrailVertical';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.WallTrailVerticalImage),
          (t.time = ((new Date().getTime() - this._time) % this.duration) / this.duration),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.WallTrailVerticalMaterialProperty = t),
      (Cesium.Material.WallTrailVerticalType = 'WallTrailVertical'),
      (Cesium.Material.WallTrailVerticalImage =
        'data:image/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAABCAYAAAAo2wu9AAAAOklEQVQoU2P8//+/McMoIDsEfv/+zcLKysrOwMDAAcVg9t+/fzmYmZkxxP/9+8fBxMSEIc7AwAAWAwD/kwzHVTmPqQAAAABJRU5ErkJggg=='),
      (Cesium.Material.WallTrailVerticalSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n {\n      czm_material material = czm_getDefaultMaterial(materialInput);\n      vec2 st = materialInput.st;\n      vec4 colorImage = texture2D(image, vec2(fract(st.t - time), st.t));\n      material.alpha = colorImage.a * color.a;\n      material.diffuse =  1.5* color.rgb  ;\n      return material;\n  }'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.WallTrailVerticalType, {
        fabric: {
          type: Cesium.Material.WallTrailVerticalType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 0.5), image: Cesium.Material.WallTrailVerticalImage, time: 0 },
          source: Cesium.Material.WallTrailVerticalSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    var e = (TMap3D.Utils.CoordinatesHelper = function () {
      (this.PI = 3.141592653589793),
        (this.a = 6378137),
        (this.b = 6356752.3142),
        (this.f = (this.a - this.b) / this.a),
        (this.e_sq = this.f * (2 - this.f)),
        (this.ee = 0.00669437999013),
        (this.WGSF = 1 / 298.257223563),
        (this.WGSe2 = this.WGSF * (2 - this.WGSF)),
        (this.WGSa = 6378137),
        (this.EPSILON = 1e-12);
    });
    (e.prototype.CalculateCoordinates = function (e, t, i, o) {
      var n = o * Math.sin(((2 * this.PI) / 360) * i),
        o = o * Math.cos(((2 * this.PI) / 360) * i);
      360 < t && (t %= 360), t < 0 && (t = 360 + (t % 360));
      var r,
        s,
        i = this.lonLat2WebMercator(e),
        e = null,
        e =
          t <= 90
            ? ((r = o * Math.cos(((2 * this.PI) / 360) * t)),
              (s = o * Math.sin(((2 * this.PI) / 360) * t)),
              { x: i.x + r, y: i.y - s })
            : 90 < t && t <= 180
            ? ((r = o * Math.sin(((2 * this.PI) / 360) * (t - 90))),
              (s = o * Math.cos(((2 * this.PI) / 360) * (t - 90))),
              { x: i.x - r, y: i.y - s })
            : 180 < t && t <= 270
            ? ((r = o * Math.cos(((2 * this.PI) / 360) * (t - 180))),
              (s = o * Math.sin(((2 * this.PI) / 360) * (t - 180))),
              { x: i.x - r, y: i.y + s })
            : ((r = o * Math.sin(((2 * this.PI) / 360) * (t - 270))),
              (s = o * Math.cos(((2 * this.PI) / 360) * (t - 270))),
              { x: i.x + r, y: i.y + s });
      return { lng: (e = this.webMercator2LonLat(e)).x, lat: e.y, height: n };
    }),
      (e.prototype.lonLat2WebMercator = function (e) {
        return {
          x: (e.x * this.a) / 180,
          y: ((Math.log(Math.tan(((90 + e.y) * this.PI) / 360)) / (this.PI / 180)) * this.a) / 180,
        };
      }),
      (e.prototype.webMercator2LonLat = function (e) {
        var t = (e.x / this.a) * 180,
          e = (e.y / this.a) * 180;
        return { x: t, y: (e = (180 / this.PI) * (2 * Math.exp((e * this.PI) / 180) - this.PI / 2)) };
      }),
      (e.prototype.get_atan = function (e, t) {
        var i = void 0;
        return (
          0 == e
            ? (i = this.PI / 2)
            : 0 == t
            ? (i = this.PI)
            : ((i = Math.atan(Math.abs(t / e))),
              0 < t && e < 0
                ? (i = this.PI - i)
                : t < 0 && e < 0
                ? (i = this.PI + i)
                : t < 0 && 0 < e && (i = 2 * this.M_PI - i)),
          i
        );
      }),
      (e.prototype.ConvertLLAToXYZ = function (e) {
        var t = (this.PI / 180) * e.longitude,
          i = (this.PI / 180) * e.latitude,
          o = e.altitude,
          e = this.a / Math.sqrt(1 - this.ee * Math.sin(i) * Math.sin(i));
        return {
          x: (e + o) * Math.cos(i) * Math.cos(t),
          y: (e + o) * Math.cos(i) * Math.sin(t),
          z: (e * (1 - this.ee) + o) * Math.sin(i),
        };
      }),
      (e.prototype.ConvertXYZToLLA = function (e) {
        var t = this.get_atan(e.x, e.y);
        t < 0 && (t += this.PI);
        var i,
          o,
          n = this.get_atan(Math.sqrt(e.x * e.x + e.y * e.y), e.z),
          r = Math.sqrt(1 - this.WGSe2 * Math.sin(n) * Math.sin(n));
        for (
          this.WGSa;
          (o = n),
            (r = Math.sqrt(1 - this.WGSe2 * Math.sin(o) * Math.sin(o))),
            (i = this.WGSa / r),
            (n = this.get_atan(Math.sqrt(e.x * e.x + e.y * e.y), e.z + i * this.WGSe2 * Math.sin(o))),
            Math.abs(n - o) > this.EPSILON;

        );
        var s =
          Math.sqrt(e.x * e.x + e.y * e.y) / Math.cos(n) -
          this.WGSa / Math.sqrt(1 - this.WGSe2 * Math.sin(n) * Math.sin(n));
        return { longitude: (180 * t) / this.PI, latitude: (180 * n) / this.PI, altitude: s };
      }),
      (e.prototype.enu_to_ecef = function (e, t) {
        var i = t.distance,
          o = t.azimuth,
          n = t.elevation,
          r = 0 <= n ? i * Math.sin((this.PI / 180) * n) : -1 * i * Math.sin((this.PI / 180) * Math.abs(n)),
          s = i * Math.cos((this.PI / 180) * Math.abs(n)),
          a = void 0,
          l = void 0,
          l =
            o <= 90
              ? ((a = s * Math.sin((this.PI / 180) * o)), s * Math.cos((this.PI / 180) * o))
              : 90 < o && o < 180
              ? ((a = s * Math.cos((this.PI / 180) * (o - 90))), -1 * s * Math.sin((this.PI / 180) * (o - 90)))
              : 180 < o && o < 270
              ? ((a = -1 * s * Math.sin((this.PI / 180) * (o - 180))), -1 * s * Math.cos((this.PI / 180) * (o - 180)))
              : ((a = -1 * s * Math.sin((this.PI / 180) * (360 - o))), s * Math.cos((this.PI / 180) * (360 - o))),
          h = this.radians(e.latitude),
          u = this.radians(e.longitude),
          t = e.altitude,
          i = Math.sin(h),
          n = this.a / Math.sqrt(1 - this.e_sq * i * i),
          s = Math.sin(h),
          o = Math.cos(h),
          e = Math.sin(u),
          i = Math.cos(u),
          h = (t + (1 - this.e_sq) * n) * s,
          u = o * r - s * l;
        return this.ConvertXYZToLLA({
          x: i * u - e * a + (t + n) * o * i,
          y: e * u + i * a + (t + n) * o * e,
          z: s * r + o * l + h,
        });
      }),
      (e.prototype.radians = function (e) {
        return (this.PI / 180) * e;
      });
  })(),
  (function () {
    var l = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    function i(e) {
      var t,
        i,
        o,
        n,
        r = '',
        s = 0,
        a = /[^A-Za-z0-9\+\/\=]/g;
      if (!e || a.exec(e)) return e;
      for (
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        (t = (l.indexOf(e.charAt(s++)) << 2) | ((i = l.indexOf(e.charAt(s++))) >> 4)),
          (i = ((15 & i) << 4) | ((a = l.indexOf(e.charAt(s++))) >> 2)),
          (o = ((3 & a) << 6) | (n = l.indexOf(e.charAt(s++)))),
          (r += String.fromCharCode(t)),
          64 != a && (r += String.fromCharCode(i)),
          64 != n && (r += String.fromCharCode(o)),
          s < e.length;

      );
      return r;
    }
    function o(e) {
      return 'string' == typeof e;
    }
    function n(e, t) {
      return (
        isNaN(e) && ((e = i(e)), (e = isNaN(e) ? 0 : e)),
        o(e) && (e = parseFloat(e)),
        isNaN(t) && ((t = i(t)), (t = isNaN(t) ? 0 : t)),
        o(t) && (t = parseFloat(t)),
        { lng: (this.lng = e), lat: (this.lat = t) }
      );
    }
    var e = {
        $O: 6370996.81,
        lG: [12890594.86, 8362377.87, 5591021, 3481989.83, 1678043.12, 0],
        Au: [75, 60, 45, 30, 15, 0],
        fP: [
          [
            1.410526172116255e-8, 898305509648872e-20, -1.9939833816331, 200.9824383106796, -187.2403703815547,
            91.6087516669843, -23.38765649603339, 2.57121317296198, -0.03801003308653, 17337981.2,
          ],
          [
            -7.435856389565537e-9, 8983055097726239e-21, -0.78625201886289, 96.32687599759846, -1.85204757529826,
            -59.36935905485877, 47.40033549296737, -16.50741931063887, 2.28786674699375, 10260144.86,
          ],
          [
            -3.030883460898826e-8, 898305509983578e-20, 0.30071316287616, 59.74293618442277, 7.357984074871,
            -25.38371002664745, 13.45380521110908, -3.29883767235584, 0.32710905363475, 6856817.37,
          ],
          [
            -1.981981304930552e-8, 8983055099779535e-21, 0.03278182852591, 40.31678527705744, 0.65659298677277,
            -4.44255534477492, 0.85341911805263, 0.12923347998204, -0.04625736007561, 4482777.06,
          ],
          [
            3.09191371068437e-9, 8983055096812155e-21, 6995724062e-14, 23.10934304144901, -0.00023663490511,
            -0.6321817810242, -0.00663494467273, 0.03430082397953, -0.00466043876332, 2555164.4,
          ],
          [
            2.890871144776878e-9, 8983055095805407e-21, -3.068298e-8, 7.47137025468032, -353937994e-14,
            -0.02145144861037, -1234426596e-14, 0.00010322952773, -323890364e-14, 826088.5,
          ],
        ],
        iG: [
          [
            -0.0015702102444, 111320.7020616939, 0x60e374c3105a3, -0x24bb4115e2e164, 0x5cc55543bb0ae8,
            -0x7ce070193f3784, 0x5e7ca61ddf8150, -0x261a578d8b24d0, 0x665d60f3742ca, 82.5,
          ],
          [
            0.0008277824516172526, 111320.7020463578, 647795574.6671607, -4082003173.641316, 10774905663.51142,
            -15171875531.51559, 12053065338.62167, -5124939663.577472, 913311935.9512032, 67.5,
          ],
          [
            0.00337398766765, 111320.7020202162, 4481351.045890365, -23393751.19931662, 79682215.47186455,
            -115964993.2797253, 97236711.15602145, -43661946.33752821, 8477230.501135234, 52.5,
          ],
          [
            0.00220636496208, 111320.7020209128, 51751.86112841131, 3796837.749470245, 992013.7397791013,
            -1221952.21711287, 1340652.697009075, -620943.6990984312, 144416.9293806241, 37.5,
          ],
          [
            -0.0003441963504368392, 111320.7020576856, 278.2353980772752, 2485758.690035394, 6070.750963243378,
            54821.18345352118, 9540.606633304236, -2710.55326746645, 1405.483844121726, 22.5,
          ],
          [
            -0.0003218135878613132, 111320.7020701615, 0.00369383431289, 823725.6402795718, 0.46104986909093,
            2351.343141331292, 1.58060784298199, 8.77738589078284, 0.37238884252424, 7.45,
          ],
        ],
        p: null,
        j: void 0,
        JD: function (e, t, i) {
          for (; i < e; ) e -= i - t;
          for (; e < t; ) e += i - t;
          return e;
        },
        ND: function (e, t, i) {
          return null != t && (e = Math.max(e, t)), (e = null != i ? Math.min(e, i) : e);
        },
        Fb: function (e) {
          var t;
          (e.lng = e.lon || e.lng),
            (e.lat = e.lat),
            (e.lng = this.JD(e.lng, -180, 180)),
            (e.lat = this.ND(e.lat, -74, 74));
          for (var i = new n(e.lng, e.lat), o = 0; o < this.Au.length; o++)
            if (i.lat >= this.Au[o]) {
              t = this.iG[o];
              break;
            }
          if (!t)
            for (o = 0; o < this.Au.length; o++)
              if (i.lat <= -this.Au[o]) {
                t = this.iG[o];
                break;
              }
          return { lon: (e = new n((e = this.gK(e, t)).lng, e.lat)).lng, lat: e.lat };
        },
        gK: function (e, t) {
          if (e && t) {
            var i = t[0] + t[1] * Math.abs(e.lng),
              o = Math.abs(e.lat) / t[9],
              o =
                t[2] +
                t[3] * o +
                t[4] * o * o +
                t[5] * o * o * o +
                t[6] * o * o * o * o +
                t[7] * o * o * o * o * o +
                t[8] * o * o * o * o * o * o;
            return new n((i = i * (e.lng < 0 ? -1 : 1)), (o = o * (e.lat < 0 ? -1 : 1)));
          }
        },
        ToLL: function (e) {
          if (e === this.p || e === this.j) return new n(0, 0);
          e.lng = e.lon || e.lng;
          for (var t, i = new n(Math.abs(e.lng), Math.abs(e.lat)), o = 0; o < this.lG.length; o++)
            if (i.lat >= this.lG[o]) {
              t = this.fP[o];
              break;
            }
          return { lon: (e = this.gK(e, t)).lng.toFixed(6), lat: e.lat.toFixed(6) };
        },
      },
      t = (TMap3D.T = {});
    t.Baidu = e;
    e = new (function () {
      var g = 3.141592653589793,
        w = 0.006693421622965943,
        o = 52.35987755982988,
        i = 20037508.34,
        E = 6378245,
        e = {
          transform: function (e, t) {
            (e = parseFloat(e)), (t = parseFloat(t));
            var i = {};
            if (this.outofChina(t, e)) return (i.lon = e), (i.lat = t), i;
            var o = this.transformLat(e - 105, t - 35),
              n = this.transformLon(e - 105, t - 35),
              r = (t / 180) * g,
              s = Math.sin(r),
              s = 1 - w * s * s,
              a = Math.sqrt(s),
              o = (180 * o) / (((E * (1 - w)) / (s * a)) * g),
              n = (180 * n) / ((E / a) * Math.cos(r) * g),
              o = t + o;
            return (i.lon = e + n), (i.lat = o), i;
          },
          outofChina: function (e, t) {
            return t < 72.004 || 137.8347 < t || e < 0.8293 || 55.8271 < e;
          },
          transformLat: function (e, t) {
            var i = 2 * e - 100 + 3 * t + 0.2 * t * t + 0.1 * e * t + 0.2 * Math.sqrt(Math.abs(e));
            return (
              (i += (2 * (20 * Math.sin(6 * e * g) + 20 * Math.sin(2 * e * g))) / 3),
              (i += (2 * (20 * Math.sin(t * g) + 40 * Math.sin((t / 3) * g))) / 3),
              (i += (2 * (160 * Math.sin((t / 12) * g) + 320 * Math.sin((t * g) / 30))) / 3)
            );
          },
          transformLon: function (e, t) {
            t = 300 + e + 2 * t + 0.1 * e * e + 0.1 * e * t + 0.1 * Math.sqrt(Math.abs(e));
            return (
              (t += (2 * (20 * Math.sin(6 * e * g) + 20 * Math.sin(2 * e * g))) / 3),
              (t += (2 * (20 * Math.sin(e * g) + 40 * Math.sin((e / 3) * g))) / 3),
              (t += (2 * (150 * Math.sin((e / 12) * g) + 300 * Math.sin((e / 30) * g))) / 3)
            );
          },
          gcj2wgs: function (e, t) {
            for (var i = e, o = t, n = 0; ++n < 1e3; ) {
              var r = i - 105,
                s = o - 35,
                a = 300 + r + 2 * s + 0.1 * r * r + 0.1 * r * s + 0.1 * Math.sqrt(Math.abs(r));
              (a += (2 * (20 * Math.sin(6 * r * g) + 20 * Math.sin(2 * r * g))) / 3),
                (a += (2 * (20 * Math.sin(r * g) + 40 * Math.sin((r / 3) * g))) / 3),
                (a += (2 * (150 * Math.sin((r / 12) * g) + 300 * Math.sin((r * g) / 30))) / 3);
              var l = 2 * r - 100 + 3 * s + 0.2 * s * s + 0.1 * r * s + 0.2 * Math.sqrt(Math.abs(r));
              (l += (2 * (20 * Math.sin(6 * r * g) + 20 * Math.sin(2 * r * g))) / 3),
                (l += (2 * (20 * Math.sin(s * g) + 40 * Math.sin((s / 3) * g))) / 3),
                (l += (2 * (160 * Math.sin((s / 12) * g) + 320 * Math.sin((s * g) / 30))) / 3);
              var h = 0,
                h = 0 < r ? 0.05 / Math.sqrt(r) : r < 0 ? -0.05 / Math.sqrt(-r) : 0,
                u = g * r,
                c = g * s,
                p =
                  1 +
                  0.2 * r +
                  0.1 * s +
                  h +
                  (2 *
                    (120 * g * Math.cos(6 * u) +
                      40 * g * Math.cos(2 * u) +
                      (20 * g * Math.cos(u) + ((40 * g) / 3) * Math.cos(u / 3)) +
                      (12.5 * g * Math.cos(u / 12) + 10 * g * Math.cos(u / 30)))) /
                    3,
                d = 2 + 0.1 * r,
                m = 2 + 0.1 * s + 2 * h + (2 * (120 * g * Math.cos(6 * u) + 40 * g * Math.cos(2 * u))) / 3,
                f =
                  3 +
                  0.4 * s +
                  0.1 * r +
                  (2 *
                    (20 * g * Math.cos(c) +
                      ((40 * g) / 3) * Math.cos(c / 3) +
                      (((40 * g) / 3) * Math.cos(c / 12) + ((32 * g) / 3) * Math.cos(c / 30)))) /
                    3,
                y = (o / 180) * g,
                v = Math.sin(y),
                C = Math.cos(y),
                h = 1 - w * v * v,
                u = Math.sqrt(h),
                s = E / u,
                r = (-g * w * v * C) / (180 * u),
                c = (-E * r) / h,
                y = g * s * C,
                p = 1 + (180 * p) / y,
                v = (180 * d) / y - (180 * a * g * (c * C - (g * s * v) / 180)) / (y * y),
                y = g * s * (1 - w),
                m = (180 * h * m) / y,
                c = 1 + (180 * (s * (f * h + 2 * l * u * r) - l * h * c)) / (s * y),
                s = this.transform(i, o),
                y = e - s.lon,
                c = (y * m - (t - s.lat) * p) / (v * m - c * p),
                p = (y - v * c) / p;
              if (Math.abs(c) < 1e-9 && Math.abs(p) < 1e-9) break;
              (i += p), (o += c);
            }
            return { lon: i, lat: o };
          },
          bd_encrypt: function (e, t) {
            var i = e,
              e = t,
              t = Math.sqrt(i * i + e * e) + 2e-5 * Math.sin(e * o),
              i = Math.atan2(e, i) + 3e-6 * Math.cos(i * o);
            return { lon: t * Math.cos(i) + 0.0065, lat: t * Math.sin(i) + 0.006 };
          },
          bd_decrypt: function (e, t) {
            var i = e - 0.0065,
              e = t - 0.006,
              t = Math.sqrt(i * i + e * e) - 2e-5 * Math.sin(e * o),
              i = Math.atan2(e, i) - 3e-6 * Math.cos(i * o);
            return { lon: t * Math.cos(i), lat: t * Math.sin(i) };
          },
          webMoctorJW2PM: function (e, t) {
            var i = { lon: 0, lat: 0 };
            (e = parseFloat(e)),
              (t = parseFloat(t)),
              (i.lon = (e / 180) * 20037508.34),
              (t = 85.05112 < t ? 85.05112 : t) < -85.05112 && (t = -85.05112),
              (t = (Math.PI / 180) * t);
            t = Math.PI / 4 + t / 2;
            return (i.lat = (20037508.34 * Math.log(Math.tan(t))) / Math.PI), i;
          },
          inverseMercator: function (e, t) {
            return {
              lon: (e = (180 * e) / i),
              lat: (t = (180 / Math.PI) * (2 * Math.atan(Math.exp((t / i) * Math.PI)) - Math.PI / 2)),
            };
          },
        };
      return e;
    })();
    (t.helper = e).H = n;
  })(),
  (function () {
    Math.PI, Math.PI;
    var p = (TMap3D.Utils.NormalUtils = {
      FITTING_COUNT: 100,
      HALF_PI: Math.PI / 2,
      ZERO_TOLERANCE: 3e-6,
      TWO_PI: 2 * Math.PI,
      ERADIUS: 6378137,
      PRADIUS: 6356725,
    });
    (p.distance = function (e, t) {
      return Math.sqrt(Math.pow(e[0] - t[0], 2) + Math.pow(e[1] - t[1], 2));
    }),
      (p.wholeDistance = function (i) {
        var o = 0;
        return (
          i &&
            Array.isArray(i) &&
            0 < i.length &&
            i.forEach(function (e, t) {
              t < i.length - 1 && (o += p.distance(e, i[t + 1]));
            }),
          o
        );
      }),
      (p.getBaseLength = function (e) {
        return Math.pow(p.wholeDistance(e), 0.99);
      }),
      (p.mid = function (e, t) {
        return [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2];
      }),
      (p.getCircleCenterOfThreePoints = function (e, t, i) {
        var o = [(e[0] + t[0]) / 2, (e[1] + t[1]) / 2],
          n = [o[0] - e[1] + t[1], o[1] + e[0] - t[0]],
          t = [(e[0] + i[0]) / 2, (e[1] + i[1]) / 2],
          i = [t[0] - e[1] + i[1], t[1] + e[0] - i[0]];
        return p.getIntersectPoint(o, n, t, i);
      }),
      (p.getIntersectPoint = function (e, t, i, o) {
        if (e[1] === t[1]) return [((o[0] - i[0]) / (o[1] - i[1])) * (e[1] - i[1]) + i[0], e[1]];
        if (i[1] === o[1]) return [((t[0] - e[0]) / (t[1] - e[1])) * (i[1] - e[1]) + e[0], i[1]];
        (t = (t[0] - e[0]) / (t[1] - e[1])),
          (o = (o[0] - i[0]) / (o[1] - i[1])),
          (o = (t * e[1] - e[0] - o * i[1] + i[0]) / (t - o));
        return [t * o - t * e[1] + e[0], o];
      }),
      (p.getAzimuth = function (e, t) {
        var i = void 0,
          o = Math.asin(Math.abs(t[1] - e[1]) / p.distance(e, t));
        return (
          t[1] >= e[1] && t[0] >= e[0]
            ? (i = o + Math.PI)
            : t[1] >= e[1] && t[0] < e[0]
            ? (i = 2 * Math.PI - o)
            : t[1] < e[1] && t[0] < e[0]
            ? (i = o)
            : t[1] < e[1] && t[0] >= e[0] && (i = Math.PI - o),
          i
        );
      }),
      (p.getAngleOfThreePoints = function (e, t, i) {
        i = p.getAzimuth(t, e) - p.getAzimuth(t, i);
        return i < 0 ? i + 2 * Math.PI : i;
      }),
      (p.isClockWise = function (e, t, i) {
        return (i[1] - e[1]) * (t[0] - e[0]) > (t[1] - e[1]) * (i[0] - e[0]);
      }),
      (p.getPointOnLine = function (e, t, i) {
        return [t[0] + e * (i[0] - t[0]), t[1] + e * (i[1] - t[1])];
      }),
      (p.getCubicValue = function (e, t, i, o, n) {
        var r = 1 - (e = Math.max(Math.min(e, 1), 0)),
          s = e * e,
          a = s * e,
          l = r * r,
          h = l * r;
        return [
          h * t[0] + 3 * l * e * i[0] + 3 * r * s * o[0] + a * n[0],
          h * t[1] + 3 * l * e * i[1] + 3 * r * s * o[1] + a * n[1],
        ];
      }),
      (p.getThirdPoint = function (e, t, i, o, n) {
        (e = p.getAzimuth(e, t)), (e = n ? e + i : e - i), (i = o * Math.cos(e)), (e = o * Math.sin(e));
        return [t[0] + i, t[1] + e];
      }),
      (p.inherits = function (e, n) {
        function t() {}
        (t.prototype = n.prototype),
          (e.superClass_ = n.prototype),
          (e.prototype = new t()),
          ((e.prototype.constructor = e).base = function (e, t, i) {
            var o = Array.prototype.slice.call(arguments, 2);
            return n.prototype[t].apply(e, o);
          });
      }),
      (p.getArcPoints = function (e, t, i, o) {
        for (var n = [], r = (r = o - i) < 0 ? r + 2 * Math.PI : r, s = 0; s <= 100; s++) {
          var a = i + (r * s) / 100,
            l = e[0] + t * Math.cos(a),
            h = e[1] + t * Math.sin(a);
          n.push([l, h]);
        }
        return n;
      }),
      (p.getBisectorNormals = function (e, t, i, o) {
        var n = p.getNormal(t, i, o),
          r = null,
          s = null,
          a = null,
          l = Math.sqrt(n[0] * n[0] + n[1] * n[1]),
          h = n[0] / l,
          u = n[1] / l,
          c = p.distance(t, i),
          n = p.distance(i, o),
          s =
            3e-6 < l
              ? p.isClockWise(t, i, o)
                ? ((r = [i[0] - (a = e * c) * u, i[1] + a * h]), [i[0] + (a = e * n) * u, i[1] - a * h])
                : ((r = [i[0] + (a = e * c) * u, i[1] - a * h]), [i[0] - (a = e * n) * u, i[1] + a * h])
              : ((r = [i[0] + e * (t[0] - i[0]), i[1] + e * (t[1] - i[1])]),
                [i[0] + e * (o[0] - i[0]), i[1] + e * (o[1] - i[1])]);
        return [r, s];
      }),
      (p.getNormal = function (e, t, i) {
        var o = e[0] - t[0],
          n = e[1] - t[1],
          e = Math.sqrt(o * o + n * n);
        (o /= e), (n /= e);
        (e = i[0] - t[0]), (i = i[1] - t[1]), (t = Math.sqrt(e * e + i * i));
        return [o + (e /= t), n + (i /= t)];
      }),
      (p.getLeftMostControlPoint = function (e, t) {
        var i,
          o = [e[0], e[1], e[2], null, null],
          n = o[0],
          r = o[1],
          s = o[2],
          a = o[3],
          l = o[4],
          h = p.getBisectorNormals(0, n, r, s)[0],
          u = p.getNormal(n, r, s);
        return (
          (l =
            3e-6 < Math.sqrt(u[0] * u[0] + u[1] * u[1])
              ? ((i = i(n, r)),
                (e = n[0] - i[0]),
                (o = n[1] - i[1]),
                (s = 2 / p.distance(n, r)),
                (u = h[0] - i[0]),
                (h = h[1] - i[1]),
                (a = i[0] + ((o = -s * o) * o - (s = s * e) * s) * u + (e = 2 * o * s) * h),
                i[1] + e * u + (s * s - o * o) * h)
              : ((a = n[0] + t * (r[0] - n[0])), n[1] + t * (r[1] - n[1]))),
          [a, l]
        );
      }),
      (p.getRightMostControlPoint = function (e, t) {
        var i,
          o = e.length,
          n = e[o - 3],
          r = e[o - 2],
          s = e[o - 1],
          a = p.getBisectorNormals(0, n, r, s)[1],
          l = p.getNormal(n, r, s),
          h = null,
          u = null;
        return (
          (u =
            3e-6 < Math.sqrt(l[0] * l[0] + l[1] * l[1])
              ? ((i = i(r, s)),
                (e = s[0] - i[0]),
                (o = s[1] - i[1]),
                (n = 2 / p.distance(r, s)),
                (l = a[0] - i[0]),
                (a = a[1] - i[1]),
                (h = i[0] + ((o = -n * o) * o - (n = n * e) * n) * l + (e = 2 * o * n) * a),
                i[1] + e * l + (n * n - o * o) * a)
              : ((h = s[0] + t * (r[0] - s[0])), s[1] + t * (r[1] - s[1]))),
          [h, u]
        );
      }),
      (p.getCurvePoints = function (e, t) {
        for (var i = null, o = null, n = [p.getLeftMostControlPoint(t, e)], r = [], s = 0; s < t.length - 2; s++)
          var a = [t[s], t[s + 1], t[s + 2]],
            i = a[0],
            o = a[1],
            a = p.getBisectorNormals(e, i, o, a[2]),
            n = n.concat(a);
        var l = p.getRightMostControlPoint(t, e);
        l && n.push(l);
        for (var h = 0; h < t.length - 1; h++) {
          (i = t[h]), (o = t[h + 1]), r.push(i);
          for (var u = 0; u < 100; u++) {
            var c = p.getCubicValue(100, i, n[2 * h], n[2 * h + 1], o);
            r.push(c);
          }
          r.push(o);
        }
        return r;
      }),
      (p.getBezierPoints = function (e) {
        if (e.length <= 2) return e;
        for (var t = [], i = e.length - 1, o = 0; o <= 1; o += 0.01) {
          for (var n = 0, r = 0, s = 0; s <= i; s++) {
            var a = p.getBinomialFactor(i, s),
              l = Math.pow(o, s),
              h = Math.pow(1 - o, i - s);
            (n += a * l * h * e[s][0]), (r += a * l * h * e[s][1]);
          }
          t.push([n, r]);
        }
        return t.push(e[i]), t;
      }),
      (p.getFactorial = function (e) {
        var t = 1;
        switch (e) {
          case e <= 1:
            t = 1;
            break;
          case 2 === e:
            t = 2;
            break;
          case 3 === e:
            t = 6;
            break;
          case 24 === e:
            t = 24;
            break;
          case 5 === e:
            t = 120;
            break;
          default:
            for (var i = 1; i <= e; i++) t *= i;
        }
        return t;
      }),
      (p.getBinomialFactor = function (e, t) {
        return p.getFactorial(e) / (p.getFactorial(t) * p.getFactorial(e - t));
      }),
      (p.getQBSplinePoints = function (e) {
        if (e.length <= 2) return e;
        var t = [],
          i = e.length - 2 - 1;
        t.push(e[0]);
        for (var o = 0; o <= i; o++)
          for (var n = 0; n <= 1; n += 0.05) {
            for (var r = 0, s = 0, a = 0; a <= 2; a++) {
              var l = p.getQuadricBSplineFactor(a, n);
              (r += l * e[o + a][0]), (s += l * e[o + a][1]);
            }
            t.push([r, s]);
          }
        return t.push(e[e.length - 1]), t;
      }),
      (p.getQuadricBSplineFactor = function (e, t) {
        var i = 0;
        return (
          0 === e
            ? (i = Math.pow(t - 1, 2) / 2)
            : 1 === e
            ? (i = (-2 * Math.pow(t, 2) + 2 * t + 1) / 2)
            : 2 === e && (i = Math.pow(t, 2) / 2),
          i
        );
      }),
      (p.getuuid = function () {
        for (var e = [], t = '0123456789abcdef', i = 0; i < 36; i++) e[i] = t.substr(Math.floor(16 * Math.random()), 1);
        return (e[14] = '4'), (e[19] = t.substr((3 & e[19]) | 8, 1)), (e[8] = e[13] = e[18] = e[23] = '-'), e.join('');
      }),
      (p.stamp = function (e) {
        var t = '_event_id_';
        return (e[t] = e[t] || p.getuuid()), e[t];
      }),
      (p.trim = function (e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
      }),
      (p.splitWords = function (e) {
        return p.trim(e).split(/\s+/);
      }),
      (p.isObject = function (e) {
        return null != e && ('object' == typeof e || 'function' == typeof e);
      }),
      (p.merge = function e(t, i) {
        for (var o in i) isObject(i[o]) && isObject(t[o]) ? e(t[o], i[o]) : (t[o] = i[o]);
        return t;
      }),
      (p.preventDefault = function (e) {
        (e = e || window.event).preventDefault ? e.preventDefault() : (e.returnValue = !1);
      }),
      (p.bindAll = function (e, t) {
        e.forEach(function (e) {
          t[e] && (t[e] = t[e].bind(t));
        });
      });
  })(),
  (function () {
    Cesium.Ion.getDefaultTokenCredit = function (e) {};
    var s = (TMap3D.Utils.MapUtils = {});
    (s.getPointsCenter = function (e) {
      var t = 1 / 0,
        i = 1 / 0,
        o = -1 / 0,
        n = -1 / 0;
      return (
        e.forEach(function (e) {
          t > e[0] && (t = e[0]), i > e[1] && (i = e[1]), o < e[0] && (o = e[0]), n < e[1] && (n = e[1]);
        }),
        [(t + o) / 2, (i + n) / 2]
      );
    }),
      (s.getPlotCode = function () {
        var e = new Date(),
          t = e.getFullYear() + '';
        return (
          (t += e.getMonth() + 1),
          (t += e.getDate()),
          (t += e.getHours()),
          (t += e.getMinutes()),
          (t += e.getSeconds()),
          (t += e.getMilliseconds())
        );
      }),
      (s.cartesian3ToCoordinates = function (e) {
        e = Cesium.Cartographic.fromCartesian(e);
        return [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height];
      }),
      (s.unifiedHeight = function (e, t) {
        t = t || s.getPositionHeight(e[0]);
        for (var i = 0; i < e.length; i++) {
          var o = e[i],
            n = s.cartesian3ToPoint3D(o);
          e[i] = Cesium.Cartesian3.fromDegrees(n.x, n.y, t);
        }
        return t;
      }),
      (s.getPositionHeight = function (e) {
        return Cesium.Cartographic.fromCartesian(e).height;
      }),
      (s.cartesian3ToPoint3D = function (e) {
        e = Cesium.Cartographic.fromCartesian(e);
        return { x: Cesium.Math.toDegrees(e.longitude), y: Cesium.Math.toDegrees(e.latitude), z: e.height };
      }),
      (s.midPosition = function (e, t) {
        if (!e || !t) return null;
        (e = s.cartesian3ToPoint3D(e)),
          (t = s.cartesian3ToPoint3D(t)),
          (t = { x: (e.x + t.x) / 2, y: (e.y + t.y) / 2, z: (e.z + t.z) / 2 });
        return Cesium.Cartesian3.fromDegrees(t.x, t.y, t.z);
      }),
      (s.cartesian3ToLonLat = function (e) {
        e = Cesium.Cartographic.fromCartesian(e);
        return [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude)];
      }),
      (s.getDistanceH = function (e, t) {
        (e = s.cartesian3ToLonLat(e)), (t = s.cartesian3ToLonLat(t));
        return s.distance(e, t);
      }),
      (s.spaceDistance = function (e) {
        if (e.length < 2) return 0;
        for (var t = 0, i = 0; i < e.length - 1; i++) t += Cesium.Cartesian3.distance(e[i], e[i + 1]);
        return t.toFixed(3);
      }),
      (s.computeArea = function (e) {
        if (e.length < 3) return 0;
        var t = [];
        return (
          e.forEach(function (e) {
            t.push(s.cartesian3ToLonLat(e));
          }),
          t.push(t[0]),
          s.getArea({ type: 'Feature', properties: {}, geometry: { type: 'Polygon', coordinates: [t] } }).toFixed(3)
        );
      }),
      (s.getArea = function (e) {
        var h = 6378137;
        function n(e) {
          var t = 0;
          if (e && 0 < e.length) {
            t += Math.abs(o(e[0]));
            for (var i = 1; i < e.length; i++) t -= Math.abs(o(e[i]));
          }
          return t;
        }
        function o(e) {
          var t,
            i,
            o,
            n,
            r,
            s,
            a = 0,
            l = e.length;
          if (2 < l) {
            for (s = 0; s < l; s++)
              (r =
                s === l - 2
                  ? ((o = l - 2), (n = l - 1), 0)
                  : s === l - 1
                  ? ((o = l - 1), (n = 0), 1)
                  : ((n = (o = s) + 1), s + 2)),
                (t = e[o]),
                (i = e[n]),
                (a += (u(e[r][0]) - u(t[0])) * Math.sin(u(i[1])));
            a = (a * h * h) / 2;
          }
          return a;
        }
        function u(e) {
          return (e * Math.PI) / 180;
        }
        function t(e, r, s) {
          var a = s;
          return (
            (function (e, t) {
              for (
                var i,
                  o,
                  n,
                  r,
                  s,
                  a,
                  l,
                  h,
                  u,
                  c = 0,
                  p = 'FeatureCollection' === e.type,
                  d = 'Feature' === e.type,
                  m = p ? e.features.length : 1,
                  f = 0;
                f < m;
                f++
              ) {
                for (
                  s = p ? e.features[f].geometry : d ? e.geometry : e,
                    l = p ? e.features[f].properties : d ? e.properties : {},
                    h = p ? e.features[f].bbox : d ? e.bbox : void 0,
                    u = p ? e.features[f].id : d ? e.id : void 0,
                    r = (a = !!s && 'GeometryCollection' === s.type) ? s.geometries.length : 1,
                    o = 0;
                  o < r;
                  o++
                )
                  if (null !== (n = a ? s.geometries[o] : s))
                    switch (n.type) {
                      case 'Point':
                      case 'LineString':
                      case 'MultiPoint':
                      case 'Polygon':
                      case 'MultiLineString':
                      case 'MultiPolygon':
                        t(n, c, l, h, u);
                        break;
                      case 'GeometryCollection':
                        for (i = 0; i < n.geometries.length; i++) t(n.geometries[i], c, l, h, u);
                        break;
                      default:
                        throw new Error('Unknown Geometry Type');
                    }
                  else t(null, c, l, h, u);
                c++;
              }
            })(e, function (e, t, i, o, n) {
              a = 0 === t && void 0 === s ? e : r(a, e, t, i, o, n);
            }),
            a
          );
        }
        return t(
          e,
          function (e, t) {
            return (
              e +
              (function e(t) {
                var i,
                  o = 0;
                switch (t.type) {
                  case 'Polygon':
                    return n(t.coordinates);
                  case 'MultiPolygon':
                    for (i = 0; i < t.coordinates.length; i++) o += n(t.coordinates[i]);
                    return o;
                  case 'Point':
                  case 'MultiPoint':
                  case 'LineString':
                  case 'MultiLineString':
                    return 0;
                  case 'GeometryCollection':
                    for (i = 0; i < t.geometries.length; i++) o += e(t.geometries[i]);
                    return o;
                }
              })(t)
            );
          },
          0,
        );
      }),
      (s.cartesian3sToLonLats = function (e) {
        var t = [];
        return (
          e.forEach(function (e) {
            t.push(s.cartesian3ToLonLat(e));
          }),
          t
        );
      }),
      (s.get2PositionDistance = function (e, t) {
        (e = s.cartesian3ToLonLat(e)), (t = s.cartesian3ToLonLat(t));
        return s.distance(e, t);
      }),
      (s.distance = function (e, t) {
        var i = (e[1] * Math.PI) / 180,
          o = (t[1] * Math.PI) / 180,
          t = (e[0] * Math.PI) / 180 - (t[0] * Math.PI) / 180,
          t =
            2 *
            Math.asin(
              Math.sqrt(Math.pow(Math.sin((i - o) / 2), 2) + Math.cos(i) * Math.cos(o) * Math.pow(Math.sin(t / 2), 2)),
            );
        return (t *= 6378.137), (t = Math.round(1e4 * t) / 10);
      }),
      (s.booleanClockwise = function (e) {
        var t = [];
        e.map(function (e) {
          t.push(s.cartesian3ToDegrees(e));
        }),
          t.push(t[0]);
        for (var i, o, n = 0, r = 1; r < t.length; )
          (i = o || t[0]), (n += ((o = t[r])[0] - i[0]) * (o[1] + i[1])), r++;
        return 0 < n;
      }),
      (s.cartesian3ToDegrees = function (e) {
        e = Cesium.Cartographic.fromCartesian(e);
        return [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude)];
      }),
      (s.getClippingPlanes = function (e) {
        for (var t = e.length, i = [], o = 0; o < t; ++o) {
          var n = (o + 1) % t,
            r = Cesium.Cartesian3.add(e[o], e[n], new Cesium.Cartesian3()),
            r = Cesium.Cartesian3.multiplyByScalar(r, 0.5, r),
            s = Cesium.Cartesian3.normalize(r, new Cesium.Cartesian3()),
            n = Cesium.Cartesian3.subtract(e[n], r, new Cesium.Cartesian3()),
            n = Cesium.Cartesian3.normalize(n, n),
            n = Cesium.Cartesian3.cross(n, s, new Cesium.Cartesian3()),
            n = Cesium.Cartesian3.normalize(n, n),
            s = new Cesium.Plane(n, 0),
            r = Cesium.Plane.getPointDistance(s, r);
          i.push(new Cesium.ClippingPlane(n, r));
        }
        return i;
      }),
      (s.getMinHeight = function (e) {
        var t,
          i = 1e6;
        return (
          e.map(function (e) {
            (t = s.cartesian3ToDegreesHeight(e)), i > t[2] && (i = t[2]);
          }),
          i
        );
      }),
      (s.cartesian3ToDegreesHeight = function (e) {
        e = Cesium.Cartographic.fromCartesian(e);
        return [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height];
      }),
      (s.point2dToPoint3d = function (e, t) {
        return Cesium.Cartesian3.fromDegrees(e[0], e[1], t);
      }),
      (s.poin2dsToPoint3ds = function (e, t) {
        var i = [];
        t = t || 0;
        for (var o = 0; o < e.length; o++) i.push(s.point2dToPoint3d(e[o], t));
        return i;
      }),
      (s.point3dToPoint2d = function (e) {
        e = Cesium.Cartographic.fromCartesian(e);
        return [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude)];
      }),
      (s.point3dsToPoint2ds = function (e) {
        for (var t = [], i = 0; i < e.length; i++) t.push(s.point3dToPoint2d(e[i]));
        return t;
      }),
      (s.llsToWorldXYZs = function (e) {
        if (3 == e[0].length) return s.llhsToWorldXYZs(e);
        for (var t = new Array(), i = 0; i < e.length; ++i) t = t.concat(e[i]);
        return new Cesium.Cartesian3.fromDegreesArray(t);
      }),
      (s.llhsToWorldXYZs = function (e) {
        if (2 == e[0].length) return s.llsToWorldXYZs(e);
        for (var t = new Array(), i = 0; i < e.length; ++i) t = t.concat(e[i]);
        return new Cesium.Cartesian3.fromDegreesArrayHeights(t);
      }),
      (s.webMoctorJW2PM = function (e, t) {
        var i = { lon: 0, lat: 0 };
        (e = parseFloat(e)),
          (t = parseFloat(t)),
          (i.lon = (e / 180) * 20037508.34),
          (t = 85.05112 < t ? 85.05112 : t) < -85.05112 && (t = -85.05112),
          (t = (Math.PI / 180) * t);
        t = Math.PI / 4 + t / 2;
        return (i.lat = (20037508.34 * Math.log(Math.tan(t))) / Math.PI), i;
      }),
      (s.inverseMercator = function (e, t) {
        return {
          lon: (e = (180 * e) / 20037508.34),
          lat: (t = (180 / Math.PI) * (2 * Math.atan(Math.exp((t / 20037508.34) * Math.PI)) - Math.PI / 2)),
        };
      });
  })(),
  (function () {
    var e = (TMap3D.Utils.ViewerSyncUtils = function (e, t) {
      (this.viewer1 = e), (this.viewer2 = t), (this.focusIndex = 0);
    });
    (e.prototype.sync = function (e) {
      (this.isSync = e) ? this.startSync() : this.cancelSync();
    }),
      (e.prototype.startSync = function () {
        this.viewer1.scene.postRender.addEventListener(this.syncVEventHandle, this);
        var t = this;
        (this.viewer1.container.onmouseenter = function (e) {
          t.focusIndex = 0;
        }),
          (t.viewer2.container.onmouseenter = function (e) {
            t.focusIndex = 1;
          });
      }),
      (e.prototype.cancelSync = function () {
        (this.viewer1.container.onmouseenter = void 0),
          (this.viewer2.container.onmouseenter = void 0),
          this.viewer1.scene.postRender.removeEventListener(this.syncVEventHandle, this);
      }),
      (e.prototype.syncVEventHandle = function () {
        this.isSync && (0 == this.focusIndex ? this.syncV2ToV1() : this.syncV1ToV2());
      }),
      (e.prototype.syncV2ToV1 = function () {
        this.viewer2.camera.setView({
          destination: this.viewer1.camera.position,
          orientation: {
            direction: this.viewer1.camera._direction,
            up: this.viewer1.camera.up,
            heading: this.viewer1.camera.heading,
            pitch: this.viewer1.camera.pitch,
            roll: this.viewer1.camera.roll,
          },
        });
      }),
      (e.prototype.syncV1ToV2 = function () {
        this.viewer1.camera.setView({
          destination: this.viewer2.camera.position,
          orientation: {
            direction: this.viewer2.camera._direction,
            up: this.viewer2.camera.up,
            heading: this.viewer2.camera.heading,
            pitch: this.viewer2.camera.pitch,
            roll: this.viewer2.camera.roll,
          },
        });
      });
  })(),
  (function () {
    function t(e, t) {
      (this._definitionChanged = new Cesium.Event()),
        (this.colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e),
        (this.duration = t),
        (this._time = new Date().getTime());
    }
    (t.prototype.getType = function (e) {
      return 'Cloud';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this.color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.CloudImage),
          (t.time = ((new Date().getTime() - this._time) % this.duration) / this.duration),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this.color, e.color));
      }),
      (Cesium.CloudMaterialProperty = t),
      (Cesium.Material.CloudType = 'Cloud'),
      (Cesium.Material.CloudImage = TMap3D.BaseUtils.getHostPath() + '/TMap/effects/earth_cloud.png'),
      (Cesium.Material.CloudSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n    {\n         czm_material material = czm_getDefaultMaterial(materialInput);\n         vec2 st = materialInput.st;\n         vec4 colorImage = texture2D(image,   vec2(fract(st.s + time),fract(st.t)));\n         material.alpha = colorImage.a * color.a  ;\n         material.diffuse =  1.3 * color.rgb  ;\n         return material;\n     }'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.CloudType, {
        fabric: {
          type: Cesium.Material.CloudType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 0.5), image: Cesium.Material.CloudImage, time: 0 },
          source: Cesium.Material.CloudSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e) {
      (e = Cesium.defaultValue(e, Cesium.defaultValue.EMPTY_OBJECT)),
        (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e.color),
        (this.duration = e.duration),
        (this._time = performance.now());
    }
    (t.prototype.getType = function (e) {
      return 'PolylineFlow';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.time = ((performance.now() - this._time) % this.duration) / this.duration),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.PolylineFlowMaterialProperty = t),
      (Cesium.Material.PolylineFlowType = 'PolylineFlow'),
      (Cesium.Material.PolylineFlowSource = [
        'czm_material czm_getMaterial(czm_materialInput materialInput)',
        '{',
        '    czm_material material = czm_getDefaultMaterial(materialInput);',
        '    vec2 st = materialInput.st;',
        '    float t = time;',
        '    t *= 1.3;',
        '    float alpha = smoothstep(t- 0.3, t, st.s) * step(-t, -st.s);',
        '    alpha += 0.3;',
        '    material.diffuse = color.rgb;',
        '    material.alpha = alpha;',
        '    material.emission = color.rgb;',
        '    return material;',
        '}',
      ].join('\n')),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineFlowType, {
        fabric: {
          type: Cesium.Material.PolylineFlowType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 0.5), transparent: !0, time: 20 },
          source: Cesium.Material.PolylineFlowSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e, t) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e),
        (this.duration = t),
        (this._time = new Date().getTime());
    }
    (t.prototype.getType = function (e) {
      return 'PolylineTrailLink';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.PolylineTrailLinkImage),
          (t.time = ((new Date().getTime() - this._time) % this.duration) / this.duration),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.PolylineTrailLinkMaterialProperty = t),
      (Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink'),
      (Cesium.Material.PolylineTrailLinkImage = TMap3D.BaseUtils.getHostPath() + '/TMap/effects/LinkPulse.png'),
      (Cesium.Material.PolylineTrailLinkSource = [
        'czm_material czm_getMaterial(czm_materialInput materialInput)',
        '{',
        '   czm_material material = czm_getDefaultMaterial(materialInput);',
        '   vec2 st = materialInput.st;',
        '   vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));',
        '   material.alpha = colorImage.a * color.a;',
        '   material.diffuse = (colorImage.rgb + color.rgb)* 2.5 ;',
        '   return material;',
        '}',
      ].join('\n')),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
        fabric: {
          type: Cesium.Material.PolylineTrailLinkType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 0.5), image: Cesium.Material.PolylineTrailLinkImage, time: 20 },
          source: Cesium.Material.PolylineTrailLinkSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e, t) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e),
        (this.duration = t),
        (this._time = new Date().getTime());
    }
    (t.prototype.getType = function (e) {
      return 'EllipsoidFade';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.time = ((new Date().getTime() - this._time) % this.duration) / this.duration),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.EllipsoidFadeMaterialProperty = t),
      (Cesium.Material.EllipsoidFadeType = 'EllipsoidFade'),
      (Cesium.Material.EllipsoidFadeSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n{\nczm_material material = czm_getDefaultMaterial(materialInput);\nmaterial.diffuse = 1.8 * color.rgb;\nvec2 st = materialInput.st;\nfloat dis = distance(st, vec2(0.5, 0.5));\nfloat per = fract(time);\nif(dis > per * 0.5){\nmaterial.alpha = 0.0;\ndiscard;\n}else {\nmaterial.alpha = color.a  * dis / per / 1.0;\n}\nreturn material;\n}'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.EllipsoidFadeType, {
        fabric: {
          type: Cesium.Material.EllipsoidFadeType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 1), time: 0 },
          source: Cesium.Material.EllipsoidFadeSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e) {
      (e = Cesium.defaultValue(e, Cesium.defaultValue.EMPTY_OBJECT)),
        (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e.color),
        (this.duration = Cesium.defaultValue(e.duration, 1e3)),
        (this.count = Cesium.defaultValue(e.count, 2)),
        this.count <= 0 && (this.count = 1),
        (this.gradient = Cesium.defaultValue(e.gradient, 0.1)),
        this.gradient < 0 ? (this.gradient = 0) : 1 < this.gradient && (this.gradient = 1),
        (this._time = new Date().getTime());
    }
    (t.prototype.getType = function (e) {
      return Cesium.Material.CircleWaveMaterialType;
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.time = ((new Date().getTime() - this._time) % this.duration) / this.duration),
          (t.count = this.count),
          (t.gradient = 1 + 10 * (1 - this.gradient)),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.Material.CircleWaveMaterialType = 'CircleWaveMaterial'),
      (Cesium.Material.CircleWaveSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n \n       {\n \n          czm_material material = czm_getDefaultMaterial(materialInput);\n \n           material.diffuse = 1.5 * color.rgb;\n\n           vec2 st = materialInput.st;\n\n           vec3 str = materialInput.str;\n\n           float dis = distance(st, vec2(0.5, 0.5));\n\n           float per = fract(time);\n\n           if (abs(str.z) > 0.001) {\n\n            discard;\n\n        }\n\n        if (dis > 0.5) { \n\n            discard; \n\n        } else { \n\n            float perDis = 0.5 / count;\n\n            float disNum; \n\n            float bl = .0; \n\n            for (int i = 0; i <= 999; i++) { \n\n                if (float(i) <= count) { \n\n                    disNum = perDis *float(i) - dis + per / count; \n\n                    if (disNum > 0.0) { \n \n                        if (disNum < perDis) { \n\n                            bl = 1.0 - disNum / perDis;\n\n                        }\n  \n                        else if(disNum - perDis < perDis) { \n \n                            bl = 1.0 - abs(1.0 - disNum / perDis); \n\n                        } \n  \n                        material.alpha = pow(bl, gradient); \n\n                    } \n\n                } \n\n            } \n\n        } \n\n        return material; \n\n    } \n'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleWaveMaterialType, {
        fabric: {
          type: Cesium.Material.CircleWaveMaterialType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 1), time: 1, count: 1, gradient: 0.1 },
          source: Cesium.Material.CircleWaveSource,
        },
        translucent: function (e) {
          return !0;
        },
      }),
      (Cesium.CircleWaveMaterialProperty = t);
  })(),
  (function () {
    function t(e, t, i) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e),
        (this.duration = t),
        (this.count = i),
        (this._time = new Date().getTime());
    }
    (t.prototype.getType = function (e) {
      return 'WallTrailStripeVertical';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.WallTrailStripeVerticalImage),
          (t.time = ((new Date().getTime() - this._time) % this.duration) / this.duration),
          (t.count = this.count),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.WallTrailStripeVerticalMaterialProperty = t),
      (Cesium.Material.WallTrailStripeVerticalType = 'WallTrailStripeVertical'),
      (Cesium.Material.WallTrailStripeVerticalImage =
        'data:image/octet-stream;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAUCAYAAAB7wJiVAAACgklEQVRoQ9WZi27DIAxFIeGX9n53//9FBTy5rSNESDC2U2mVqkQRgc7X1wczDwC/zrmQUgrzPM+3a3DOzeVzvL99L89zzmGapss953k5pnG/rAcAwXuP83rH+AAAeO+Tc27km3POaZqmRNfB9/G9rHmf1osx5hDC8ts9AJzqoHKD1xm3Eos7/iYKSxDnHBTBzKOBbYxXz5FSypjbkt/iz+fzKYSwCh45pifWqFO2xhfOIMdNDIPQkO4fDwAZnaR0htpZJFaMMZXOIPHQIT/czKUyxnXQVvCZ62GScD+arNa8WyaCyTwoyDcGKMYYNE4hsbgiNBxxcWn1XCwIOQIAkoAxS6BrVgiZk1NK6Yro63WrnKEgX0VZWuBaZjG3fDEdtMUWMdgrjnTL1y0YFhltMUcqwU6CjAJ4CZ4VQ+oyJgW7kTPMWMF1RsmQT2ZNb7qnB32la0zB7pyzyOhD50CHfBzAkK6DmAxhg13pDLUjqAzWjOkxo2YJCTJasqzG77mO1hCD3cgRSxMo6StGeyQU5L0sK1sA33o+yhDulnm0Y5eCXdmXmHfsKMibkCGc7FaNkYLdyBmHsmJv2/tqwRArp9yrY6eASPsKrbO2OnZ0CApixYRyni7Ymc5kg13pDAtHYA+0bBAkzEFBXsrAjHbsWmcwd1tisNe7L2nnfq+OHQV53jsOZ2axihWVQ1tzSU5+/13Hju5CQZ72mrvOsUm3LHHPtkiU2jFSsCv7EhJzVX5GmUOs4HbsJIgVQ5pOGRWl4UrTjp3EktT40b6is8aKWyjIo4Yh3L5i4P8grVNfNtiVzjisY+eKj4I8HHwexXEfh0FisCt3X6ujeG5wN8bt7ub+ANZIqbIlvAh5AAAAAElFTkSuQmCC'),
      (Cesium.Material.WallTrailStripeVerticalSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n        {\n             czm_material material = czm_getDefaultMaterial(materialInput);\n             vec2 st = materialInput.st;\n             vec4 colorImage = texture2D(image, vec2(fract(count*st.t - time), fract(st.s)));\n             material.alpha = colorImage.a * color.a;\n             material.diffuse =  1.5* color.rgb  ;\n             return material;\n         }'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.WallTrailStripeVerticalType, {
        fabric: {
          type: Cesium.Material.WallTrailStripeVerticalType,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: Cesium.Material.WallTrailStripeVerticalImage,
            time: 0,
            count: 1,
          },
          source: Cesium.Material.WallTrailStripeVerticalSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e);
    }
    function i(e) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e);
    }
    (t.prototype.getType = function (e) {
      return 'ConeGlowBottomCircle';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.ConeGlowBottomCircleImage),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.ConeGlowBottomCircleMaterialProperty = t),
      (Cesium.Material.ConeGlowBottomCircleType = 'ConeGlowBottomCircle'),
      (Cesium.Material.ConeGlowBottomCircleImage = (function () {
        var e = document.createElement('canvas');
        (e.width = 512), (e.height = 512);
        var t = e.getContext('2d'),
          i = t.createRadialGradient(256, 256, 0, 256, 256, 256);
        return (
          i.addColorStop(0.1, 'rgba(255, 255, 255, 1.0)'),
          i.addColorStop(0.2, 'rgba(255, 255, 255, 0.0)'),
          i.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)'),
          i.addColorStop(0.5, 'rgba(255, 255, 255, 0.0)'),
          i.addColorStop(0.9, 'rgba(255, 255, 255, 0.2)'),
          i.addColorStop(1, 'rgba(255, 255, 255, 1.0)'),
          t.clearRect(0, 0, 512, 512),
          t.beginPath(),
          t.arc(256, 256, 256, 0, 2 * Math.PI, !0),
          (t.fillStyle = i),
          t.fill(),
          t.restore(),
          e.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        );
      })()),
      (Cesium.Material.ConeGlowBottomCircleSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n    {\n         czm_material material = czm_getDefaultMaterial(materialInput);\n         vec2 st = materialInput.st;\n         vec4 colorImage = texture2D(image,  vec2(st ));\n         material.alpha = colorImage.a * color.a;\n         material.diffuse =  1.5* color.rgb  ;\n         return material;\n     }'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.ConeGlowBottomCircleType, {
        fabric: {
          type: Cesium.Material.ConeGlowBottomCircleType,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: Cesium.Material.ConeGlowBottomCircleImage,
            time: 0,
          },
          source: Cesium.Material.ConeGlowBottomCircleSource,
        },
        translucent: function (e) {
          return !0;
        },
      }),
      (i.prototype.getType = function (e) {
        return 'ConeGlowBottomRotateCircle';
      }),
      (i.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.ConeGlowBottomRotateCircleImage),
          t
        );
      }),
      (i.prototype.equals = function (e) {
        return this === e || (e instanceof i && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.ConeGlowBottomRotateCircleMaterialProperty = i),
      (Cesium.Material.ConeGlowBottomRotateCircleType = 'ConeGlowBottomRotateCircle'),
      (Cesium.Material.ConeGlowBottomRotateCircleImage = (function () {
        var e = document.createElement('canvas');
        (e.width = 512), (e.height = 512);
        var t = e.getContext('2d');
        return (
          t.clearRect(0, 0, 512, 512),
          (t.strokeStyle = 'rgb(255, 255, 0)'),
          t.setLineDash([80, 80]),
          (t.lineWidth = 30),
          t.arc(256, 256, 241, 0, 2 * Math.PI, !0),
          t.stroke(),
          e.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        );
      })()),
      (Cesium.Material.ConeGlowBottomRotateCircleSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n    {\n         czm_material material = czm_getDefaultMaterial(materialInput);\n         vec2 st = materialInput.st;\n         vec4 colorImage = texture2D(image, vec2(st ));\n         material.diffuse = 2.5 * color.rgb  ;\n         material.alpha = colorImage.a ;\n         return material;\n     }'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.ConeGlowBottomRotateCircleType, {
        fabric: {
          type: Cesium.Material.ConeGlowBottomRotateCircleType,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: Cesium.Material.ConeGlowBottomRotateCircleImage,
            time: 0,
          },
          source: Cesium.Material.ConeGlowBottomRotateCircleSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e) {
      (e = Cesium.defaultValue(e, Cesium.defaultValue.EMPTY_OBJECT)),
        (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e.color),
        (this.duration = e.duration),
        (this._time = performance.now());
    }
    (t.prototype.getType = function (e) {
      return 'FlowDynamicLine';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.FlowDynamicLineImage),
          (t.time = ((performance.now() - this._time) % this.duration) / this.duration),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.FlowDynamicLineMaterialProperty = t),
      (Cesium.Material.FlowDynamicLineType = 'FlowDynamicLine'),
      (Cesium.Material.FlowDynamicLineImage = TMap3D.BaseUtils.getHostPath() + '/TMap/effects/flowdynamicline.png'),
      (Cesium.Material.FlowDynamicLineSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n           {\n                 czm_material material = czm_getDefaultMaterial(materialInput);\n                 vec2 st = materialInput.st;\n                 vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n                 material.alpha = colorImage.a * color.a;\n                 material.diffuse = color.rgb*1.5;\n                 return material;\n         }'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.FlowDynamicLineType, {
        fabric: {
          type: Cesium.Material.FlowDynamicLineType,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: Cesium.Material.FlowDynamicLineImage,
            transparent: !0,
            time: 20,
          },
          source: Cesium.Material.FlowDynamicLineSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e);
    }
    (t.prototype.getType = function (e) {
      return 'ScanCircle';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.ScanCircleImage),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.ScanCircleMaterialProperty = t),
      (Cesium.Material.ScanCircleType = 'ScanCircle'),
      (Cesium.Material.ScanCircleImage = TMap3D.BaseUtils.getHostPath() + '/TMap/effects/scancircle.png'),
      (Cesium.Material.ScanCircleSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n{\n     czm_material material = czm_getDefaultMaterial(materialInput);\n     vec2 st = materialInput.st;\n     vec4 colorImage = texture2D(image,  vec2(st ));\n     material.alpha = colorImage.a * color.a;\n     material.diffuse =  1.5* color.rgb  ;\n     return material;\n }'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.ScanCircleType, {
        fabric: {
          type: Cesium.Material.ScanCircleType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 0.5), image: Cesium.Material.ScanCircleImage, time: 0 },
          source: Cesium.Material.ScanCircleSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e);
    }
    (t.prototype.getType = function (e) {
      return 'HexagonSpreadScan';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.HexagonSpreadScanImage),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.HexagonSpreadScanMaterialProperty = t),
      (Cesium.Material.HexagonSpreadScanType = 'HexagonSpreadScan'),
      (Cesium.Material.HexagonSpreadScanImage = TMap3D.BaseUtils.getHostPath() + '/TMap/effects/hexagon.png'),
      (Cesium.Material.HexagonSpreadScanSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n    {\n         czm_material material = czm_getDefaultMaterial(materialInput);\n         vec2 st = materialInput.st;\n         vec4 colorImage = texture2D(image,  vec2(st ));\n         material.alpha = colorImage.a * color.a*0.5;\n         material.diffuse =  1.8* color.rgb  ;\n         return material;\n     }'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.HexagonSpreadScanType, {
        fabric: {
          type: Cesium.Material.HexagonSpreadScanType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 0.5), image: Cesium.Material.HexagonSpreadScanImage, time: 0 },
          source: Cesium.Material.HexagonSpreadScanSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e, t) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e),
        (this._imageURL = t || Cesium.Material.CircleSpreadScanImage);
    }
    (t.prototype.getType = function (e) {
      return 'CircleSpreadScan';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = this._imageURL),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && Cesium.Property.equals(this._color, e._color));
      }),
      (Cesium.CircleSpreadScanMaterialProperty = t),
      (Cesium.Material.CircleSpreadScanType = 'CircleSpreadScan'),
      (Cesium.Material.CircleSpreadScanImage = TMap3D.BaseUtils.getHostPath() + '/TMap/effects/circlegradients.png'),
      (Cesium.Material.CircleSpreadScanSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n{\n     czm_material material = czm_getDefaultMaterial(materialInput);\n     vec2 st = materialInput.st;\n     vec4 colorImage = texture2D(image,  vec2(st ));\n     material.alpha = colorImage.a * color.a* 0.6;\n     material.diffuse =  2.2* colorImage.rgb* color.rgb  ;\n     return material;\n }'),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.CircleSpreadScanType, {
        fabric: {
          type: Cesium.Material.CircleSpreadScanType,
          uniforms: { color: new Cesium.Color(1, 1, 1, 0.5), image: Cesium.Material.CircleSpreadScanImage, time: 0 },
          source: Cesium.Material.CircleSpreadScanSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    TMap3D.Utils.HeatmapUtil = {
      create: function (e) {
        return new u(e);
      },
      register: function (e, t) {
        i.plugins[e] = t;
      },
    };
    var i = {
        defaultRadius: 40,
        defaultRenderer: 'canvas2d',
        defaultGradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1: 'rgb(255,0,0)' },
        defaultMaxOpacity: 1,
        defaultMinOpacity: 0,
        defaultBlur: 0.85,
        defaultXField: 'x',
        defaultYField: 'y',
        defaultValueField: 'value',
        plugins: {},
      },
      o = function (e) {
        (this._coordinator = {}),
          (this._data = []),
          (this._radi = []),
          (this._min = 10),
          (this._max = 1),
          (this._xField = e.xField || e.defaultXField),
          (this._yField = e.yField || e.defaultYField),
          (this._valueField = e.valueField || e.defaultValueField),
          e.radius && (this._cfgRadius = e.radius);
      },
      h = i.defaultRadius;
    o.prototype = {
      _organiseData: function (e, t) {
        var i = e[this._xField],
          o = e[this._yField],
          n = this._radi,
          r = this._data,
          s = this._max,
          a = this._min,
          l = e[this._valueField] || 1,
          e = e.radius || this._cfgRadius || h;
        r[i] || ((r[i] = []), (n[i] = [])), r[i][o] ? (r[i][o] += l) : ((r[i][o] = l), (n[i][o] = e));
        r = r[i][o];
        return s < r
          ? (t ? this.setDataMax(r) : (this._max = r), !1)
          : r < a
          ? (t ? this.setDataMin(r) : (this._min = r), !1)
          : { x: i, y: o, value: l, radius: e, min: a, max: s };
      },
      _unOrganizeData: function () {
        var e,
          t = [],
          i = this._data,
          o = this._radi;
        for (e in i) for (var n in i[e]) t.push({ x: e, y: n, radius: o[e][n], value: i[e][n] });
        return { min: this._min, max: this._max, data: t };
      },
      _onExtremaChange: function () {
        this._coordinator.emit('extremachange', { min: this._min, max: this._max });
      },
      addData: function () {
        if (0 < arguments[0].length) for (var e = arguments[0], t = e.length; t--; ) this.addData.call(this, e[t]);
        else {
          var i = this._organiseData(arguments[0], !0);
          i &&
            (0 === this._data.length && (this._min = this._max = i.value),
            this._coordinator.emit('renderpartial', { min: this._min, max: this._max, data: [i] }));
        }
        return this;
      },
      setData: function (e) {
        var t = e.data,
          i = t.length;
        (this._data = []), (this._radi = []);
        for (var o = 0; o < i; o++) this._organiseData(t[o], !1);
        return (
          (this._max = e.max),
          (this._min = e.min || 0),
          this._onExtremaChange(),
          this._coordinator.emit('renderall', this._getInternalData()),
          this
        );
      },
      removeData: function () {},
      setDataMax: function (e) {
        return (
          (this._max = e), this._onExtremaChange(), this._coordinator.emit('renderall', this._getInternalData()), this
        );
      },
      setDataMin: function (e) {
        return (
          (this._min = e), this._onExtremaChange(), this._coordinator.emit('renderall', this._getInternalData()), this
        );
      },
      setCoordinator: function (e) {
        this._coordinator = e;
      },
      _getInternalData: function () {
        return { max: this._max, min: this._min, data: this._data, radi: this._radi };
      },
      getData: function () {
        return this._unOrganizeData();
      },
    };
    function r(e) {
      var t = e.gradient || e.defaultGradient,
        i = document.createElement('canvas'),
        e = i.getContext('2d');
      (i.width = 256), (i.height = 1);
      var o,
        n = e.createLinearGradient(0, 0, 256, 1);
      for (o in t) n.addColorStop(o, t[o]);
      return (e.fillStyle = n), e.fillRect(0, 0, 256, 1), e.getImageData(0, 0, 256, 1).data;
    }
    function e(e) {
      var t = e.container,
        i = (this.shadowCanvas = document.createElement('canvas')),
        o = (this.canvas = e.canvas || document.createElement('canvas')),
        n = ((this._renderBoundaries = [1e4, 1e4, 0, 0]), getComputedStyle(e.container) || {});
      (o.className = 'heatmap-canvas'),
        (this._width = o.width = i.width = e.width || +n.width.replace(/px/, '')),
        (this._height = o.height = i.height = e.height || +n.height.replace(/px/, '')),
        (this.shadowCtx = i.getContext('2d')),
        (this.ctx = o.getContext('2d')),
        (o.style.cssText = i.style.cssText = 'position:absolute;left:0;top:0;'),
        (t.style.position = 'relative'),
        t.appendChild(o),
        (this._palette = r(e)),
        (this._templates = {}),
        this._setStyles(e);
    }
    var t,
      n =
        ((t = !(e.prototype = {
          renderPartial: function (e) {
            0 < e.data.length && (this._drawAlpha(e), this._colorize());
          },
          renderAll: function (e) {
            this._clear(),
              0 < e.data.length &&
                (this._drawAlpha(
                  (function (e) {
                    for (
                      var t = [], i = e.min, o = e.max, n = e.radi, e = e.data, r = Object.keys(e), s = r.length;
                      s--;

                    )
                      for (var a = r[s], l = Object.keys(e[a]), h = l.length; h--; ) {
                        var u = l[h],
                          c = e[a][u],
                          p = n[a][u];
                        t.push({ x: a, y: u, value: c, radius: p });
                      }
                    return { min: i, max: o, data: t };
                  })(e),
                ),
                this._colorize());
          },
          _updateGradient: function (e) {
            this._palette = r(e);
          },
          updateConfig: function (e) {
            e.gradient && this._updateGradient(e), this._setStyles(e);
          },
          setDimensions: function (e, t) {
            (this._width = e),
              (this._height = t),
              (this.canvas.width = this.shadowCanvas.width = e),
              (this.canvas.height = this.shadowCanvas.height = t);
          },
          _clear: function () {
            this.shadowCtx.clearRect(0, 0, this._width, this._height),
              this.ctx.clearRect(0, 0, this._width, this._height);
          },
          _setStyles: function (e) {
            (this._blur = 0 == e.blur ? 0 : e.blur || e.defaultBlur),
              e.backgroundColor && (this.canvas.style.backgroundColor = e.backgroundColor),
              (this._width = this.canvas.width = this.shadowCanvas.width = e.width || this._width),
              (this._height = this.canvas.height = this.shadowCanvas.height = e.height || this._height),
              (this._opacity = 255 * (e.opacity || 0)),
              (this._maxOpacity = 255 * (e.maxOpacity || e.defaultMaxOpacity)),
              (this._minOpacity = 255 * (e.minOpacity || e.defaultMinOpacity)),
              (this._useGradientOpacity = !!e.useGradientOpacity);
          },
          _drawAlpha: function (e) {
            for (
              var t,
                i,
                o,
                n = (this._min = e.min),
                r = (this._max = e.max),
                s = (e = e.data || []).length,
                a = 1 - this._blur;
              s--;

            ) {
              var l,
                h = e[s],
                u = h.x,
                c = h.y,
                p = h.radius,
                d = Math.min(h.value, r),
                m = u - p,
                f = c - p,
                y = this.shadowCtx;
              this._templates[p]
                ? (l = this._templates[p])
                : (this._templates[p] =
                    ((t = p),
                    (i = a),
                    (c = u = h = o = void 0),
                    (o = document.createElement('canvas')),
                    (h = o.getContext('2d')),
                    (c = u = t),
                    (o.width = o.height = 2 * t),
                    1 == i
                      ? (h.beginPath(), h.arc(u, c, t, 0, 2 * Math.PI, !1), (h.fillStyle = 'rgba(0,0,0,1)'), h.fill())
                      : ((c = h.createRadialGradient(u, c, t * i, u, c, t)).addColorStop(0, 'rgba(0,0,0,1)'),
                        c.addColorStop(1, 'rgba(0,0,0,0)'),
                        (h.fillStyle = c),
                        h.fillRect(0, 0, 2 * t, 2 * t)),
                    (l = o)));
              d = (d - n) / (r - n);
              (y.globalAlpha = d < 0.01 ? 0.01 : d),
                y.drawImage(l, m, f),
                m < this._renderBoundaries[0] && (this._renderBoundaries[0] = m),
                f < this._renderBoundaries[1] && (this._renderBoundaries[1] = f),
                m + 2 * p > this._renderBoundaries[2] && (this._renderBoundaries[2] = m + 2 * p),
                f + 2 * p > this._renderBoundaries[3] && (this._renderBoundaries[3] = f + 2 * p);
            }
          },
          _colorize: function () {
            for (
              var e = this._renderBoundaries[0],
                t = this._renderBoundaries[1],
                i = this._renderBoundaries[2] - e,
                o = this._renderBoundaries[3] - t,
                n = this._width,
                r = this._height,
                s = this._opacity,
                a = this._maxOpacity,
                l = this._minOpacity,
                h = this._useGradientOpacity,
                o = this.shadowCtx.getImageData(
                  (e = e < 0 ? 0 : e),
                  (t = t < 0 ? 0 : t),
                  (i = n < e + i ? n - e : i),
                  (o = r < t + o ? r - t : o),
                ),
                u = o.data,
                c = u.length,
                p = this._palette,
                d = 3;
              d < c;
              d += 4
            ) {
              var m = u[d],
                f = 4 * m;
              f &&
                ((m = 0 < s ? s : m < a ? (m < l ? l : m) : a),
                (u[d - 3] = p[f]),
                (u[d - 2] = p[1 + f]),
                (u[d - 1] = p[2 + f]),
                (u[d] = h ? p[3 + f] : m));
            }
            (o.data = u), this.ctx.putImageData(o, e, t), (this._renderBoundaries = [1e3, 1e3, 0, 0]);
          },
          getValueAt: function (e) {
            var t = this.shadowCtx.getImageData(e.x, e.y, 1, 1).data[3],
              i = this._max,
              e = this._min;
            return (Math.abs(i - e) * (t / 255)) >> 0;
          },
          getDataURL: function () {
            return this.canvas.toDataURL();
          },
        })),
        (t = 'canvas2d' === i.defaultRenderer ? e : t)),
      s = {
        merge: function () {
          for (var e = {}, t = arguments.length, i = 0; i < t; i++) {
            var o,
              n = arguments[i];
            for (o in n) e[o] = n[o];
          }
          return e;
        },
      };
    function a() {
      this.cStore = {};
    }
    a.prototype = {
      on: function (e, t, i) {
        var o = this.cStore;
        o[e] || (o[e] = []),
          o[e].push(function (e) {
            return t.call(i, e);
          });
      },
      emit: function (e, t) {
        var i = this.cStore;
        if (i[e]) for (var o = i[e].length, n = 0; n < o; n++) (0, i[e][n])(t);
      },
    };
    var l = function (t) {
      var e = t._renderer,
        i = t._coordinator,
        o = t._store;
      i.on('renderpartial', e.renderPartial, e),
        i.on('renderall', e.renderAll, e),
        i.on('extremachange', function (e) {
          t._config.onExtremaChange &&
            t._config.onExtremaChange({
              min: e.min,
              max: e.max,
              gradient: t._config.gradient || t._config.defaultGradient,
            });
        }),
        o.setCoordinator(i);
    };
    function u() {
      var e = (this._config = s.merge(i, arguments[0] || {}));
      if (((this._coordinator = new a()), e.plugin)) {
        var t = e.plugin;
        if (!i.plugins[t]) throw new Error("Plugin '" + t + "' not found. Maybe it was not registered.");
        t = i.plugins[t];
        (this._renderer = new t.renderer(e)), (this._store = new t.store(e));
      } else (this._renderer = new n(e)), (this._store = new o(e));
      l(this);
    }
    u.prototype = {
      addData: function () {
        return this._store.addData.apply(this._store, arguments), this;
      },
      removeData: function () {
        return this._store.removeData && this._store.removeData.apply(this._store, arguments), this;
      },
      setData: function () {
        return this._store.setData.apply(this._store, arguments), this;
      },
      setDataMax: function () {
        return this._store.setDataMax.apply(this._store, arguments), this;
      },
      setDataMin: function () {
        return this._store.setDataMin.apply(this._store, arguments), this;
      },
      configure: function (e) {
        return (
          (this._config = s.merge(this._config, e)),
          this._renderer.updateConfig(this._config),
          this._coordinator.emit('renderall', this._store._getInternalData()),
          this
        );
      },
      repaint: function () {
        return this._coordinator.emit('renderall', this._store._getInternalData()), this;
      },
      getData: function () {
        return this._store.getData();
      },
      getDataURL: function () {
        return this._renderer.getDataURL();
      },
      getValueAt: function (e) {
        return this._store.getValueAt
          ? this._store.getValueAt(e)
          : this._renderer.getValueAt
          ? this._renderer.getValueAt(e)
          : null;
      },
    };
  })(),
  (function () {
    function t(e, t) {
      (this._definitionChanged = new Cesium.Event()),
        Object.defineProperty(this, 'isConstant', {
          get: function () {
            return !1;
          },
        }),
        Object.defineProperty(this, 'definitionChanged', {
          get: function () {
            return this._definitionChanged;
          },
        }),
        Object.defineProperty(this, 'color', Cesium.createPropertyDescriptor('color')),
        (this.color = e || Cesium.Color.YELLOW),
        (this.speed = t || 10);
    }
    (t.prototype.getType = function (e) {
      return 'Scanline';
    }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this.color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.speed = this.speed),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return (
          this === e ||
          (e instanceof t && Cesium.Property.equals(this.color, e.color) && Cesium.Property.equals(this.speed, e.speed))
        );
      }),
      (Cesium.ScanlineMaterialProperty = t),
      (Cesium.Material.ScanlineType = 'Scanline'),
      (Cesium.Material.ScanlineSource =
        'uniform vec4 color;\nuniform float speed;\nfloat circle(vec2 uv, float r, float blur) {\n  float d = length(uv) * 2.0;\n  float c = smoothstep(r+blur, r, d);\n  return c;\n}\nczm_material czm_getMaterial(czm_materialInput materialInput)\n{\n  czm_material material = czm_getDefaultMaterial(materialInput);\n  vec2 st = materialInput.st - 0.5;\n  material.diffuse =2.8 * color.rgb;\n  material.emission = vec3(0);\n  float t =fract(czm_frameNumber * speed / 1000.0);\n  float s = 0.3;\n  float radius1 = smoothstep(.0, s, t) * 0.5;\n  float alpha1 = circle(st, radius1, 0.01) * circle(st, radius1, -0.01);\n  float alpha2 = circle(st, radius1, 0.01 - radius1) * circle(st, radius1, 0.01);\n  float radius2 = 0.5 + smoothstep(s, 1.0, t) * 0.5;\n  float alpha3 = circle(st, radius1, radius2 + 0.01 - radius1) * circle(st, radius1, -0.01);\n  material.alpha = smoothstep(1.0, s, t) * (alpha1 + alpha2*0.1 + alpha3*0.1);\n  material.alpha *=color.a ;\n  return material;\n} '),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.ScanlineType, {
        fabric: {
          type: Cesium.Material.ScanlineType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 0.5), time: 0, speed: 10 },
          source: Cesium.Material.ScanlineSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e, t) {
      (this._definitionChanged = new Cesium.Event()),
        (this.duration = t),
        (this._time = performance.now()),
        (Cesium.Material.SpritelineImage = e);
    }
    Object.defineProperty(t.prototype, 'isConstant', {
      get: function () {
        return !1;
      },
    }),
      Object.defineProperty(t.prototype, 'definitionChanged', {
        get: function () {
          return this._definitionChanged;
        },
      }),
      Object.defineProperty(t.prototype, 'color', Cesium.createPropertyDescriptor('color')),
      (t.prototype.getType = function (e) {
        return 'Spriteline';
      }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).image = Cesium.Material.SpritelineImage),
          (t.time = ((performance.now() - this._time) % this.duration) / this.duration),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && this.duration == e.duration);
      }),
      (Cesium.Material.SpritelineType = 'Spriteline'),
      (Cesium.Material.SpritelineImage =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACCQAAAAECAYAAABcb3zrAAAKF0lEQVR4nO1dPW4kuxGuj3qAN3diwPGLbMChj+Cb+GCODBiOXvbu4MA38AEcOXJgsYxm/bPZWmlnRtJbsLArTXeTxfojezTf1xzQX3/6M/0ihO9v5NtVPsCIe8tk4ue1+IHR/2ROf7s5r+j5IF8/PIR8ebBu8gmFbzL0cd59LnP4sXn8BuX3secGLbx8+WHCV9a8o3E3D3VS8DaND3c1DQCAmHn8Pl1G7bRqmyWfh+pZtsz9oW20A+tvrHpm/SBiPqujyY44vo6qtedF35Ujs22z35S7LGK1it88tvl3/D43n8cvSuLqUFJf5msjn6Mf6/HsKy78vYhVtD5+MGxwnuMwxgIzsZ8WpaMfnT0Ylvl48Iox7WELM2wsyDik40CsgZqOutiA4p9eSP5FOo/+0B6LvHtMpZS18VzyONdHGsETn2OPnPUYutRIjbP4mGLZvFOadIjMwwziI0ZDcfRxL/Qfe579kpYeEzczlzUeMQWHxuNqDy006Rqmw3Nl8YUbCEmYRlt7s9tXKljbNTKXLLsRXdC4LLEXo5EWJoRRJd9SAhL9Uk3UJMhoR5EfjWxmHhY0HwnttNiEJh8OVqAtTVDOvoXHFtPqfzSoHnnGoBOWkyKknFlcoTUdMfDMMmJOIUpceiBqk5NJZMeqF1Gbmh0ZyxLAc6GnucVUZojHkmQloqTHYlDCHPZFHXsc8x0qe5n8LZbTKeY6mIVAypY1lizHzNR4vD7us9TGuS6OyvmxvDW9RtIfT/w/2IRo3Im4Q14/D3tEb+fGHeP6sKLLWCxjtMOGYyxiehr9hn4Zi5+H3uPcoWO01+PDrkbH66FvxLqN60MH0vlx7ojB0D/G9H7S7jgebZ/HBBI9XfQffSA6xiTCs+q169I/7JT2cl7iIDHr9GT6Rsy6xFnHDxsOvTpm76LL2pot1HWymz9HYrU/uuaO1U/pP6qNOz3hebSj4VPXG4W+Jsm5+SUr4bNP+mO8prptcWisiwSeR5snetZ6POyXcQhd+h+29U7th98QfvUjtS+/J3z5Hf3jP7/9+x//9q+/0MNk8Rbs297r3v4O+RV/8t9ZvuFvzzvZdedovUnhu/9Nufx79v3/sn1xxHcohJs8vkO43u1TtBdUPj7rXx/hts/l7iuvN4HLr4+3596KfwGf8d7tc7lPMAs+LLAPvgM80K9P9Yn8G7t8dqzkLRLr9/fkVZW7enYXZe8S6/Yeg2zZsmXLli1btmz5ivD0Rrsc8/SHsV6bfwM4gdO8VkHUDHANiGe06Qn8149vTx/hJtteS0a4i6Dqn2M2+311dRWnYrfHc+3bul+OBaYL1S4/NgIG8ymm0W5FmmBvh0V/clyu0hp4RgpJyAiTcoFP4my45qjzySiz1K4ZhqlAt5hYuTZKwag5FPCKSo1ZG1bwMOOwSDBj/p8d8GBc2CwMgILuWrQWdJzyGSFTDf0AMCtzYMliQWI2OHYqMGcMxJYxB7YVua3mTAaNn2BjCigENoDVwJczJSJTLU62c64hu8hiZuRuvEIqGQ6NoY3DC0jMDBxO3Xh2cw6fo9YGZidGSF7sFAEfsZPimyaIzTDIolfqPRvHZuqAE5uvu8q8KBGKpKymSS71go7LteEKjwlQCyP75ZyAooeQQhILgzdJuSlkgBIRpsQ8STSDSIutN4U5UDS8vFLWFpOFJX6p4i1xuUqO2mQ+aRErPSVsMXfrU5WzR+VEofBRFEAW5gKhm+MwBodrVJDfdbOSQZBslLVLKoODfREzN6dm8HGaveZcn6c610ZBrIi6YV/ZzEf1R6grSsEoGbLZ7fZbJnoJd2bEmAmR3ZVPdbX2TBL5SOwmst+9dKzCgZnec3gq0w2IUA5TEcfNx+8oqLH0pLY0cYQnBGHCKeHCKSxeczGhG3mRsCxU3WlPbZAipLySj8qa+8Ovv/yJtmzZsmXLli1btmzZsuU7lE1I2LJly5YtW7Zs+WgpuyIcyNRq94MF1HMFqs9APdL/aDSB5fbpvaHPL0FLp50PbNzbAnlJMFgABjlGyMD+jZKR82t1a7CxhGUii1g35PCVa7EFw0k7B35CGcJNv2Y6QgalElHiODKY3XDfClFWZQV/EmAOgT0bUSCPFhAgbHj3IlBRJI/9uj2vvDKBExUCxkswtgyPR5lBhr4jwFOiUuLlUOO5IisUyHi1SwhoQvIcq1ykIrU5nkEWbC/cNtvdOYMs4ZonOLIWJjuC7oifEkLGakL6OHk3pobRAeYQIWPN2pSnDTZS6BIUDDrbGMA9SHPk4RToEjAkXrVkQPFiyaOCIHKt3SDOkI3vA/MpzRzEhLxVgMRFTLeVkDMtxO32qM3LhVdqYtX41gUxOEeNJeMcSWWUMlP/PHUnOkDyqgwTwWV1VjN/vktk2wpc7pV5mkUROK/BhU7D/hesFdmX4cSnsrnssZlvAEhcmmQprubzcmVjrUZOvY7dALyNlz6Im+4Twf1iADixJHFakruIpQ0ltDl/7Bdjvir9Yr4fIVYJtrUzT0UUWkR6IwDzA05AdCvrCu98xOOJfpu9aQgbKeUPnPsr0QD52OgHLU3oHnoqg6bc/mJm9crh859WiF3JlZmgIAtavU2Tjh1kGbmP4CCglJuF7xIyv/3x9LPu4EBjd4WYDD2tKSzXpmkSObz9LcyWLVu2bNmyZcuWLVu2fFbZhIQtW7Zs2bJly5aPlpd2OHAp2PU1W8CA+q+C8/F4fQEXEpJ8lvX3FvhT4i/tJPC1HRNevH5BkDgRLxY6AtN9nVy1BFDgxfyo5qx+3g7ADclQ8gssjgyqnq9nhDBYBXOL8mSsgVD6pHggOzNslhGYE2RmIDNWbbwlEwo0G+FLTz0HqppKD1zi4w+zwr7ywTzigM3CjiBzRAknO5SXsQJ8kEHACMXF/Amex5KoMGFkXUF5nBpwCZ2yBlIjOEhaQVTYNyKUHQGip1ExvDDK1xgwwbHB9HC0PIvtJhmrgRV/BE8B0Wd+89dSBBtCtqf3B4fP/kP/67d66B7u5KhcjXQBi2Ox8QfCA60kyk9tQ9k2ahTqd5CE4Lx7AnSPAhYKjz/izFa8Gpn8xH8tl7TxiBdphmRPFtjZSnPRbCC/Ri2xCV2dFm+nSrD1N0jWJt60AgR2HTsAOJMkLwdLlsD5VJkjyd70wDsvDDAigpKNiJaps/NWPgF2F2KLeV5CzakW4evasQYdX6iQAxFgu26+b6XkwDyotzYT+WCUlDTLlQhQltWpUGQnER7fMtLdER6TpKUYRsh6cGKmLLKPD2eGZTaBRY09ZjIu0lf4SKPBTNKubGSCKSk9fQuLnW82OqNUjL1m/e6RPvRh6LBF32yL1UPJDWVFsWluuyvYagEfPTYckhtJP/aKsfJHFEpMPWVitch6mWqx/PiOPdPsD1qZRzDHtGl953si2+pM//z3f3+mLVu2bNmyZcuWLVu2bPnehIj+D2Hqi5m32I0cAAAAAElFTkSuQmCC'),
      (Cesium.Material.SpritelineSource =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n      {\n            czm_material material = czm_getDefaultMaterial(materialInput);\n            vec2 st = materialInput.st;\n            vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n            material.alpha = colorImage.a;\n            material.diffuse = colorImage.rgb * 1.5 ;\n            return material;\n    }'),
      (Cesium.SpritelineMaterialProperty = t),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.SpritelineType, {
        fabric: {
          type: Cesium.Material.SpritelineType,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: Cesium.Material.SpritelineImage,
            transparent: !0,
            time: 20,
          },
          source: Cesium.Material.SpritelineSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e) {
      (this._definitionChanged = new Cesium.Event()), (this.duration = e), (this._time = performance.now());
    }
    Object.defineProperty(t.prototype, 'isConstant', {
      get: function () {
        return !1;
      },
    }),
      Object.defineProperty(t.prototype, 'definitionChanged', {
        get: function () {
          return this._definitionChanged;
        },
      }),
      Object.defineProperty(t.prototype, 'color', Cesium.createPropertyDescriptor('color')),
      (t.prototype.getType = function (e) {
        return 'Spriteline1';
      }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).image = Cesium.Material.Spriteline1Image),
          (t.time = ((performance.now() - this._time) % this.duration) / this.duration),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && this.duration == e.duration);
      }),
      (Cesium.Material.Spriteline1Type = 'Spriteline1'),
      (Cesium.Material.Spriteline1Image =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAACCQAAAAECAYAAABcb3zrAAAKF0lEQVR4nO1dPW4kuxGuj3qAN3diwPGLbMChj+Cb+GCODBiOXvbu4MA38AEcOXJgsYxm/bPZWmlnRtJbsLArTXeTxfojezTf1xzQX3/6M/0ihO9v5NtVPsCIe8tk4ue1+IHR/2ROf7s5r+j5IF8/PIR8ebBu8gmFbzL0cd59LnP4sXn8BuX3secGLbx8+WHCV9a8o3E3D3VS8DaND3c1DQCAmHn8Pl1G7bRqmyWfh+pZtsz9oW20A+tvrHpm/SBiPqujyY44vo6qtedF35Ujs22z35S7LGK1it88tvl3/D43n8cvSuLqUFJf5msjn6Mf6/HsKy78vYhVtD5+MGxwnuMwxgIzsZ8WpaMfnT0Ylvl48Iox7WELM2wsyDik40CsgZqOutiA4p9eSP5FOo/+0B6LvHtMpZS18VzyONdHGsETn2OPnPUYutRIjbP4mGLZvFOadIjMwwziI0ZDcfRxL/Qfe579kpYeEzczlzUeMQWHxuNqDy006Rqmw3Nl8YUbCEmYRlt7s9tXKljbNTKXLLsRXdC4LLEXo5EWJoRRJd9SAhL9Uk3UJMhoR5EfjWxmHhY0HwnttNiEJh8OVqAtTVDOvoXHFtPqfzSoHnnGoBOWkyKknFlcoTUdMfDMMmJOIUpceiBqk5NJZMeqF1Gbmh0ZyxLAc6GnucVUZojHkmQloqTHYlDCHPZFHXsc8x0qe5n8LZbTKeY6mIVAypY1lizHzNR4vD7us9TGuS6OyvmxvDW9RtIfT/w/2IRo3Im4Q14/D3tEb+fGHeP6sKLLWCxjtMOGYyxiehr9hn4Zi5+H3uPcoWO01+PDrkbH66FvxLqN60MH0vlx7ojB0D/G9H7S7jgebZ/HBBI9XfQffSA6xiTCs+q169I/7JT2cl7iIDHr9GT6Rsy6xFnHDxsOvTpm76LL2pot1HWymz9HYrU/uuaO1U/pP6qNOz3hebSj4VPXG4W+Jsm5+SUr4bNP+mO8prptcWisiwSeR5snetZ6POyXcQhd+h+29U7th98QfvUjtS+/J3z5Hf3jP7/9+x//9q+/0MNk8Rbs297r3v4O+RV/8t9ZvuFvzzvZdedovUnhu/9Nufx79v3/sn1xxHcohJs8vkO43u1TtBdUPj7rXx/hts/l7iuvN4HLr4+3596KfwGf8d7tc7lPMAs+LLAPvgM80K9P9Yn8G7t8dqzkLRLr9/fkVZW7enYXZe8S6/Yeg2zZsmXLli1btmz5ivD0Rrsc8/SHsV6bfwM4gdO8VkHUDHANiGe06Qn8149vTx/hJtteS0a4i6Dqn2M2+311dRWnYrfHc+3bul+OBaYL1S4/NgIG8ymm0W5FmmBvh0V/clyu0hp4RgpJyAiTcoFP4my45qjzySiz1K4ZhqlAt5hYuTZKwag5FPCKSo1ZG1bwMOOwSDBj/p8d8GBc2CwMgILuWrQWdJzyGSFTDf0AMCtzYMliQWI2OHYqMGcMxJYxB7YVua3mTAaNn2BjCigENoDVwJczJSJTLU62c64hu8hiZuRuvEIqGQ6NoY3DC0jMDBxO3Xh2cw6fo9YGZidGSF7sFAEfsZPimyaIzTDIolfqPRvHZuqAE5uvu8q8KBGKpKymSS71go7LteEKjwlQCyP75ZyAooeQQhILgzdJuSlkgBIRpsQ8STSDSIutN4U5UDS8vFLWFpOFJX6p4i1xuUqO2mQ+aRErPSVsMXfrU5WzR+VEofBRFEAW5gKhm+MwBodrVJDfdbOSQZBslLVLKoODfREzN6dm8HGaveZcn6c610ZBrIi6YV/ZzEf1R6grSsEoGbLZ7fZbJnoJd2bEmAmR3ZVPdbX2TBL5SOwmst+9dKzCgZnec3gq0w2IUA5TEcfNx+8oqLH0pLY0cYQnBGHCKeHCKSxeczGhG3mRsCxU3WlPbZAipLySj8qa+8Ovv/yJtmzZsmXLli1btmzZsuU7lE1I2LJly5YtW7Zs+WgpuyIcyNRq94MF1HMFqs9APdL/aDSB5fbpvaHPL0FLp50PbNzbAnlJMFgABjlGyMD+jZKR82t1a7CxhGUii1g35PCVa7EFw0k7B35CGcJNv2Y6QgalElHiODKY3XDfClFWZQV/EmAOgT0bUSCPFhAgbHj3IlBRJI/9uj2vvDKBExUCxkswtgyPR5lBhr4jwFOiUuLlUOO5IisUyHi1SwhoQvIcq1ykIrU5nkEWbC/cNtvdOYMs4ZonOLIWJjuC7oifEkLGakL6OHk3pobRAeYQIWPN2pSnDTZS6BIUDDrbGMA9SHPk4RToEjAkXrVkQPFiyaOCIHKt3SDOkI3vA/MpzRzEhLxVgMRFTLeVkDMtxO32qM3LhVdqYtX41gUxOEeNJeMcSWWUMlP/PHUnOkDyqgwTwWV1VjN/vktk2wpc7pV5mkUROK/BhU7D/hesFdmX4cSnsrnssZlvAEhcmmQprubzcmVjrUZOvY7dALyNlz6Im+4Twf1iADixJHFakruIpQ0ltDl/7Bdjvir9Yr4fIVYJtrUzT0UUWkR6IwDzA05AdCvrCu98xOOJfpu9aQgbKeUPnPsr0QD52OgHLU3oHnoqg6bc/mJm9crh859WiF3JlZmgIAtavU2Tjh1kGbmP4CCglJuF7xIyv/3x9LPu4EBjd4WYDD2tKSzXpmkSObz9LcyWLVu2bNmyZcuWLVu2fFbZhIQtW7Zs2bJly5aPlpd2OHAp2PU1W8CA+q+C8/F4fQEXEpJ8lvX3FvhT4i/tJPC1HRNevH5BkDgRLxY6AtN9nVy1BFDgxfyo5qx+3g7ADclQ8gssjgyqnq9nhDBYBXOL8mSsgVD6pHggOzNslhGYE2RmIDNWbbwlEwo0G+FLTz0HqppKD1zi4w+zwr7ywTzigM3CjiBzRAknO5SXsQJ8kEHACMXF/Amex5KoMGFkXUF5nBpwCZ2yBlIjOEhaQVTYNyKUHQGip1ExvDDK1xgwwbHB9HC0PIvtJhmrgRV/BE8B0Wd+89dSBBtCtqf3B4fP/kP/67d66B7u5KhcjXQBi2Ox8QfCA60kyk9tQ9k2ahTqd5CE4Lx7AnSPAhYKjz/izFa8Gpn8xH8tl7TxiBdphmRPFtjZSnPRbCC/Ri2xCV2dFm+nSrD1N0jWJt60AgR2HTsAOJMkLwdLlsD5VJkjyd70wDsvDDAigpKNiJaps/NWPgF2F2KLeV5CzakW4evasQYdX6iQAxFgu26+b6XkwDyotzYT+WCUlDTLlQhQltWpUGQnER7fMtLdER6TpKUYRsh6cGKmLLKPD2eGZTaBRY09ZjIu0lf4SKPBTNKubGSCKSk9fQuLnW82OqNUjL1m/e6RPvRh6LBF32yL1UPJDWVFsWluuyvYagEfPTYckhtJP/aKsfJHFEpMPWVitch6mWqx/PiOPdPsD1qZRzDHtGl953si2+pM//z3f3+mLVu2bNmyZcuWLVu2bPnehIj+D2Hqi5m32I0cAAAAAElFTkSuQmCC'),
      (Cesium.Material.Spriteline1Source =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n      {\n            czm_material material = czm_getDefaultMaterial(materialInput);\n            vec2 st = materialInput.st;\n            vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n            material.alpha = colorImage.a;\n            material.diffuse = colorImage.rgb * 1.5 ;\n            return material;\n    }'),
      (Cesium.Spriteline1MaterialProperty = t),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.Spriteline1Type, {
        fabric: {
          type: Cesium.Material.Spriteline1Type,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: Cesium.Material.Spriteline1Image,
            transparent: !0,
            time: 20,
          },
          source: Cesium.Material.Spriteline1Source,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e) {
      (this._definitionChanged = new Cesium.Event()), (this.duration = e), (this._time = performance.now());
    }
    Object.defineProperty(t.prototype, 'isConstant', {
      get: function () {
        return !1;
      },
    }),
      Object.defineProperty(t.prototype, 'definitionChanged', {
        get: function () {
          return this._definitionChanged;
        },
      }),
      Object.defineProperty(t.prototype, 'color', Cesium.createPropertyDescriptor('color')),
      (t.prototype.getType = function (e) {
        return 'Spriteline2';
      }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).image = Cesium.Material.Spriteline2Image),
          (t.time = ((performance.now() - this._time) % this.duration) / this.duration),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && this.duration == e.duration);
      }),
      (Cesium.Material.Spriteline2Type = 'Spriteline2'),
      (Cesium.Material.Spriteline2Image =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAsSAAALEgHS3X78AAADNUlEQVR4Ae3UQQ1CURAEwXkfSaAJT6jCEio4QFclmxUwSZ/na/dt1x/f2Xb7zX/O92d5P0bWZXroEgAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwAIEwCo2vYBIuoFMq/lBSIAAAAASUVORK5CYII='),
      (Cesium.Material.Spriteline2Source =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n          {\n                czm_material material = czm_getDefaultMaterial(materialInput);\n                vec2 st = materialInput.st;\n                vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n                material.alpha = colorImage.a;\n                material.diffuse = colorImage.rgb * 1.5 ;\n                return material;\n        }'),
      (Cesium.Spriteline2MaterialProperty = t),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.Spriteline2Type, {
        fabric: {
          type: Cesium.Material.Spriteline2Type,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: Cesium.Material.Spriteline2Image,
            transparent: !0,
            time: 20,
          },
          source: Cesium.Material.Spriteline2Source,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e) {
      (this._definitionChanged = new Cesium.Event()), (this.duration = e), (this._time = performance.now());
    }
    Object.defineProperty(t.prototype, 'isConstant', {
      get: function () {
        return !1;
      },
    }),
      Object.defineProperty(t.prototype, 'definitionChanged', {
        get: function () {
          return this._definitionChanged;
        },
      }),
      Object.defineProperty(t.prototype, 'color', Cesium.createPropertyDescriptor('color')),
      (t.prototype.getType = function (e) {
        return 'Spriteline3';
      }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).image = Cesium.Material.Spriteline3Image),
          (t.time = ((performance.now() - this._time) % this.duration) / this.duration),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && this.duration == e.duration);
      }),
      (Cesium.Material.Spriteline3Type = 'Spriteline3'),
      (Cesium.Material.Spriteline3Image =
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAIAAABMXPacAAAACXBIWXMAAAsTAAALEwEAmpwYAAAQimlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnhtcFJpZ2h0cz0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3JpZ2h0cy8iIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIiB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyIgeG1wOkNyZWF0ZURhdGU9IjIwMTMtMDUtMzBUMTk6MTA6MjcrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTA2LTI1VDEzOjE4OjQ2KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTA2LTI1VDEzOjE4OjQ2KzA4OjAwIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzMgV2luZG93cyIgcGhvdG9zaG9wOkxlZ2FjeUlQVENEaWdlc3Q9IjUwQTgxQzRFN0M4NTk4ODcyREI1NzI1N0QxQzI0QzgwIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iIiBwaG90b3Nob3A6SGlzdG9yeT0iMjAxOC0wNi0yNVQxMzoxNToyMyswODowMCYjeDk75paH5Lu2IGxpZ2h0Rmxvd19zdHJpcC5qcGcg5bey5omT5byAJiN4QTsyMDE4LTA2LTI1VDEzOjE4OjQ2KzA4OjAwJiN4OTvmlofku7YgQzpcVXNlcnNcQWRtaW5pc3RyYXRvclxEZXNrdG9wXGxpZ2h0Rmxvd19zdHJpcF8xLnBuZyDlt7LlrZjlgqgmI3hBOyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkMTBjYTA1Yi1hOTQ2LTA4NGEtOTIxNS00NWY4MzE4MTM2ZDYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoxMzkxOTg2YS1hMGI2LWU1NDMtOTZhMi0wMzYzZWU4OGZkYzkiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0idXVpZDoxRDRDMUUzMjE4QzlFMjExOUUzMkQ1Mjg2NURGQ0RDNSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHhtcFJpZ2h0czpNYXJrZWQ9IkZhbHNlIiB0aWZmOkltYWdlV2lkdGg9IjEyOCIgdGlmZjpJbWFnZUxlbmd0aD0iMTI4IiB0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb249IjIiIHRpZmY6T3JpZW50YXRpb249IjEiIHRpZmY6U2FtcGxlc1BlclBpeGVsPSIzIiB0aWZmOlhSZXNvbHV0aW9uPSI3MjAwMDAvMTAwMDAiIHRpZmY6WVJlc29sdXRpb249IjcyMDAwMC8xMDAwMCIgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMiIgZXhpZjpFeGlmVmVyc2lvbj0iMDIyMSIgZXhpZjpDb2xvclNwYWNlPSI2NTUzNSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjEyOCIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjEyOCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdiYTY3ZGNkLTM4NDUtZTc0My1iZDE5LTM1ZWE5ZjE1NTFhMiIgc3RSZWY6ZG9jdW1lbnRJRD0idXVpZDoxRDRDMUUzMjE4QzlFMjExOUUzMkQ1Mjg2NURGQ0RDNSIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSJ1dWlkOjFENEMxRTMyMThDOUUyMTE5RTMyRDUyODY1REZDREM1Ii8+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOkM4OENERjYzNEZGMEUzMTE5RDNDRjc4RDAwMDFCOTQwIiBzdEV2dDp3aGVuPSIyMDE0LTA2LTEwVDExOjQ3OjMwKzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBpbWFnZS9qcGVnIHRvIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImRlcml2ZWQiIHN0RXZ0OnBhcmFtZXRlcnM9ImNvbnZlcnRlZCBmcm9tIGltYWdlL2pwZWcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Qzk4Q0RGNjM0RkYwRTMxMTlEM0NGNzhEMDAwMUI5NDAiIHN0RXZ0OndoZW49IjIwMTQtMDYtMTBUMTE6NDc6MzArMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTVBQTkyRTIzRkYxRTMxMThFMTlGNDJGMTZENTVFOTUiIHN0RXZ0OndoZW49IjIwMTQtMDYtMTFUMTY6MjU6NDYrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6NTZBQTkyRTIzRkYxRTMxMThFMTlGNDJGMTZENTVFOTUiIHN0RXZ0OndoZW49IjIwMTQtMDYtMTFUMTY6MjY6MDIrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzUgV2luZG93cyIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvanBlZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCB0byBpbWFnZS9qcGVnIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1N0FBOTJFMjNGRjFFMzExOEUxOUY0MkYxNkQ1NUU5NSIgc3RFdnQ6d2hlbj0iMjAxNC0wNi0xMVQxNjoyNjowMiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3YmE2N2RjZC0zODQ1LWU3NDMtYmQxOS0zNWVhOWYxNTUxYTIiIHN0RXZ0OndoZW49IjIwMTgtMDYtMjVUMTM6MTg6NDYrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNvbnZlcnRlZCIgc3RFdnQ6cGFyYW1ldGVycz0iZnJvbSBpbWFnZS9qcGVnIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gaW1hZ2UvanBlZyB0byBpbWFnZS9wbmciLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmQxMGNhMDViLWE5NDYtMDg0YS05MjE1LTQ1ZjgzMTgxMzZkNiIgc3RFdnQ6d2hlbj0iMjAxOC0wNi0yNVQxMzoxODo0NiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHRpZmY6Qml0c1BlclNhbXBsZT4gPHJkZjpTZXE+IDxyZGY6bGk+ODwvcmRmOmxpPiA8cmRmOmxpPjg8L3JkZjpsaT4gPHJkZjpsaT44PC9yZGY6bGk+IDwvcmRmOlNlcT4gPC90aWZmOkJpdHNQZXJTYW1wbGU+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3ngMaQAAAPVJREFUeNrt0TEOwjAQAEH7XASMHSLl8sbwbvgIHU9ACM32W019nlm+VV16XGb0LW5bjGwzY802j5jZxh5jj36P61qXXmp8rtfjKP9bFAEAIAAABACAAAAQAAACAEAAAAgAAAEAIAAABACAAAAQAAACAEAAAAgAAAEAIAAABACAAAAQAAACAEAAAAgAAAEAIAAABACAAAAQAAACAEAAAAgAAAACAEAAAAgAAAEAIAAABACAAAAQAAACAEAAAAgAAAEAIAAABACAAAAQAAACAEAAAAgAAAEAIAAABACAAAAQAAACAEAAAAgAAAEAIAAABACAAPxAb29vBV2PIDSNAAAAAElFTkSuQmCC'),
      (Cesium.Material.Spriteline3Source =
        'czm_material czm_getMaterial(czm_materialInput materialInput)\n          {\n                czm_material material = czm_getDefaultMaterial(materialInput);\n                vec2 st = materialInput.st;\n                vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n                material.alpha = colorImage.a;\n                material.diffuse = colorImage.rgb * 1.2;\n                return material;\n        }'),
      (Cesium.Spriteline3MaterialProperty = t),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.Spriteline3Type, {
        fabric: {
          type: Cesium.Material.Spriteline3Type,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: Cesium.Material.Spriteline3Image,
            transparent: !0,
            time: 20,
          },
          source: Cesium.Material.Spriteline3Source,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e) {
      (this._definitionChanged = new Cesium.Event()),
        (this.colorSubscription = void 0),
        (this.speed = e.speed || 6 * Math.random()),
        (this.color = e.color || Cesium.Color.RED),
        (this.percent = e.percent || 0.1),
        (this.gradient = e.gradient || 0.01);
    }
    Object.defineProperty(t.prototype, 'isConstant', {
      get: function () {
        return !1;
      },
    }),
      Object.defineProperty(t.prototype, 'definitionChanged', {
        get: function () {
          return this._definitionChanged;
        },
      }),
      Object.defineProperty(t.prototype, 'color', Cesium.createPropertyDescriptor('color')),
      (t.prototype.getType = function (e) {
        return 'PolylineTrail';
      }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this.color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.speed = this.speed),
          (t.gradient = this.gradient),
          (t.percent = this.percent),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return this === e || (e instanceof t && this.speed == e.speed && Cesium.Property.equals(this.color, e.color));
      }),
      (Cesium.PolylineTrailMaterialProperty = t),
      (Cesium.Material.PolylineTrailType = 'PolylineTrail'),
      (Cesium.Material.PolylineTrailSource = [
        'uniform vec4 color;',
        'uniform float speed;',
        'uniform float percent;',
        'uniform float gradient;',
        'czm_material czm_getMaterial(czm_materialInput materialInput){',
        '    czm_material material = czm_getDefaultMaterial(materialInput);',
        '    vec2 st = materialInput.st;',
        '    float t =fract(czm_frameNumber * speed / 1000.0);',
        '    t *= (1.0 + percent);',
        '    float alpha = smoothstep(t- percent, t, st.s) * step(-t, -st.s);',
        '    alpha += gradient;',
        '    material.diffuse = color.rgb;',
        '    material.alpha = alpha;',
        '    return material;',
        '}',
      ].join('\n')),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailType, {
        fabric: {
          type: Cesium.Material.PolylineTrailType,
          uniforms: { color: new Cesium.Color(1, 0, 0, 0.5), transparent: !0, speed: 0, gradient: 0.01, percent: 0.1 },
          source: Cesium.Material.PolylineTrailSource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    function t(e, t, i) {
      (this._definitionChanged = new Cesium.Event()),
        (this._color = void 0),
        (this._colorSubscription = void 0),
        (this.color = e),
        (this.duration = t),
        (this.count = i),
        (this._time = new Date().getTime());
    }
    Object.defineProperty(t.prototype, 'isConstant', {
      get: function () {
        return !1;
      },
    }),
      Object.defineProperty(t.prototype, 'definitionChanged', {
        get: function () {
          return this._definitionChanged;
        },
      }),
      Object.defineProperty(t.prototype, 'color', Cesium.createPropertyDescriptor('color')),
      (t.prototype.getType = function (e) {
        return 'PolylineArrowOpacity';
      }),
      (t.prototype.getValue = function (e, t) {
        return (
          ((t = !Cesium.defined(t) ? {} : t).color = Cesium.Property.getValueOrClonedDefault(
            this._color,
            e,
            Cesium.Color.WHITE,
            t.color,
          )),
          (t.image = Cesium.Material.PolylineArrowOpacityImage),
          (t.time = ((new Date().getTime() - this._time) % this.duration) / this.duration),
          (t.count = this.count || 4),
          t
        );
      }),
      (t.prototype.equals = function (e) {
        return (
          this === e ||
          (e instanceof t &&
            Cesium.Property.equals(this._color, e._color) &&
            this.duration == e.duration &&
            this.count == e.count)
        );
      }),
      (Cesium.PolylineArrowOpacityMaterialProperty = t),
      (Cesium.Material.PolylineArrowOpacityType = 'PolylineArrowOpacity'),
      (Cesium.Material.PolylineArrowOpacityImage = TMap3D.BaseUtils.getHostPath() + '/TMap/effects/arrowopacity.png'),
      (Cesium.Material.PolylineArrowOpacitySource = [
        'czm_material czm_getMaterial(czm_materialInput materialInput)',
        '{',
        '   czm_material material = czm_getDefaultMaterial(materialInput);',
        '   vec2 st = materialInput.st;',
        '   vec4 colorImage = texture2D(image, vec2(fract( count * st.s - time),fract(st.t)));',
        '   material.alpha =  colorImage.a * color.a;',
        '   material.diffuse =  color.rgb * 3.0 ;',
        '   return material;',
        '}',
      ].join('\n')),
      Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineArrowOpacityType, {
        fabric: {
          type: Cesium.Material.PolylineArrowOpacityType,
          uniforms: {
            color: new Cesium.Color(1, 0, 0, 0.5),
            image: Cesium.Material.PolylineArrowOpacityImage,
            time: 20,
            count: 4,
          },
          source: Cesium.Material.PolylineArrowOpacitySource,
        },
        translucent: function (e) {
          return !0;
        },
      });
  })(),
  (function () {
    var e = (TMap3D.Utils.WKT = function () {
      this.regExes = {
        typeStr: /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
        spaces: /\s+/,
        parenComma: /\)\s*,\s*\(/,
        doubleParenComma: /\)\s*\)\s*,\s*\(\s*\(/,
        trimParens: /^\s*\(?(.*?)\)?\s*$/,
      };
    });
    (e.prototype.read = function (e) {
      var t;
      e = e.replace(/[\n\r]/g, ' ');
      var i = this.regExes.typeStr.exec(e);
      return i && ((e = i[1].toLowerCase()), (i = i[2]), this.parse[e] && (t = this.parse[e].apply(this, [i]))), t;
    }),
      (e.prototype.parse = {
        point: function (e) {
          return e.trim().split(this.regExes.spaces);
        },
        linestring: function (e) {
          for (var t = e.trim().split(','), i = [], o = 0, n = t.length; o < n; ++o) {
            var r = t[o].trim().split(this.regExes.spaces);
            i.push(parseFloat(r[0])), i.push(parseFloat(r[1]));
          }
          return i;
        },
        polygon: function (e) {
          var t = [],
            i = e.trim().split(this.regExes.parenComma),
            o = 0;
          for (i.length; o < 1; ++o) {
            ring = i[o].replace(this.regExes.trimParens, '$1');
            for (var n = ring.trim().split(','), r = 0, s = n.length; r < s; ++r) {
              point = n[r].replace(this.regExes.trimParens, '$1');
              var a = point.trim().split(this.regExes.spaces);
              t.push(parseFloat(a[0])), t.push(parseFloat(a[1]));
            }
          }
          return t;
        },
      });
  })(),
  (function () {
    var e = (TMap3D.Application.VideoProject = function (e, t) {
      (this.viewer = e), (this.CT = new TMap3D.Utils.CoordinatesHelper()), (this.options = t);
      t = this.initCameraParam();
      (this.near = t.near || 0.1),
        (this.cameraPosition = t.cameraPosition),
        (this.position = t.position),
        (this.alpha = t.alpha || 1),
        (this.videoDomID = t.elementID),
        (this.url = t.url),
        (this.debugFrustum = Cesium.defaultValue(t.debugFrustum, !0)),
        (this.aspectRatio = t.aspectRatio || 1),
        (this.fov = t.fov || 400),
        this.cameraPosition && this.position
          ? (this.activeVideo(this.videoDomID),
            this.getOrientation(),
            this.createShadowMap(),
            this.addCameraFrustum(),
            this.addPostProcess(),
            this.viewer.scene.primitives.add(this))
          : console.log('位置坐标错误');
    });
    (e.prototype.getOptions = function () {
      return this.options;
    }),
      (e.prototype.updateOptions = function (e) {
        this.viewer.scene.primitives.remove(this.cameraFrustum), (this.options = e);
        e = this.initCameraParam();
        (this.near = e.near || 0.1),
          (this.cameraPosition = e.cameraPosition),
          (this.position = e.position),
          (this.alpha = e.alpha || 1),
          (this.url = e.url),
          (this.debugFrustum = Cesium.defaultValue(e.debugFrustum, !0)),
          (this.aspectRatio = e.aspectRatio || 1),
          (this.fov = e.fov || 400),
          this.cameraPosition && this.position
            ? (this.getOrientation(), this.createShadowMap(), this.addCameraFrustum())
            : console.log('位置坐标错误');
      }),
      (e.prototype.initCameraParam = function () {
        this.CT.enu_to_ecef(
          {
            longitude: +this.options.position.x,
            latitude: +this.options.position.y,
            altitude: +this.options.position.z,
          },
          { distance: this.options.far, azimuth: +this.options.rotation.y, elevation: +this.options.rotation.x },
        );
        var e = new Cesium.Cartesian3(-2479449, 4823345, 3345663),
          t = Cesium.Cartesian3.fromDegrees(
            +this.options.position.x,
            +this.options.position.y,
            +this.options.position.z,
          );
        return {
          url: this.options.url,
          elementID: this.options.elementID,
          cameraPosition: t,
          position: e,
          alpha: this.options.alpha,
          near: this.options.near,
          fov: this.options.fov,
          debugFrustum: this.options.debugFrustum,
        };
      }),
      (e.prototype.createVideoEle = function (e) {
        return document.getElementById(e);
      }),
      (e.prototype.activeVideo = function (e) {
        var t = this.createVideoEle(e),
          i = this;
        t &&
          (this.activeVideoListener ||
            (this.activeVideoListener = function () {
              i.videoTexture && i.videoTexture.destroy(),
                (i.videoTexture = new Cesium.Texture({
                  context: i.viewer.scene.context,
                  source: t,
                  width: 1,
                  height: 1,
                  pixelFormat: Cesium.PixelFormat.RGBA,
                  pixelDatatype: Cesium.PixelDatatype.UNSIGNED_BYTE,
                }));
            }),
          this.viewer.clock.onTick.addEventListener(this.activeVideoListener));
      }),
      (e.prototype.deActiveVideo = function () {
        this.activeVideoListener &&
          (this.viewer.clock.onTick.removeEventListener(this.activeVideoListener), delete this.activeVideoListener);
      }),
      (e.prototype.update = function (e) {
        this.viewShadowMap && this.viewer.scene.frameState.shadowMaps.push(this.viewShadowMap);
      }),
      (e.prototype.createShadowMap = function () {
        var e = new Cesium.Camera(this.viewer.scene);
        (e.position = this.cameraPosition),
          (e.direction = Cesium.Cartesian3.subtract(
            this.position,
            this.cameraPosition,
            new Cesium.Cartesian3(0, 0, 0),
          )),
          (e.up = Cesium.Cartesian3.normalize(this.cameraPosition, new Cesium.Cartesian3(0, 0, 0)));
        var t = Cesium.Cartesian3.distance(this.position, this.cameraPosition);
        (e.frustum = new Cesium.PerspectiveFrustum({
          fov: Cesium.Math.toRadians(this.fov),
          aspectRatio: 1,
          near: this.near,
          far: t,
        })),
          (this.viewShadowMap = new Cesium.ShadowMap({
            lightCamera: e,
            enable: !1,
            isPointLight: !1,
            isSpotLight: !0,
            cascadesEnabled: !1,
            context: this.viewer.scene.context,
            pointLightRadius: t,
          }));
      }),
      (e.prototype.getOrientation = function () {
        var e = Cesium.Cartesian3.normalize(
            Cesium.Cartesian3.subtract(this.position, this.cameraPosition, new Cesium.Cartesian3()),
            new Cesium.Cartesian3(),
          ),
          t = Cesium.Cartesian3.normalize(this.cameraPosition, new Cesium.Cartesian3()),
          i = new Cesium.Camera(this.viewer.scene);
        (i.position = this.cameraPosition), (i.direction = e), (i.up = t);
        var e = i.directionWC,
          t = i.upWC,
          o = i.rightWC,
          n = new Cesium.Cartesian3(),
          r = new Cesium.Matrix3(),
          i = new Cesium.Quaternion(),
          o = Cesium.Cartesian3.negate(o, n);
        Cesium.Matrix3.setColumn(r, 0, o, r),
          Cesium.Matrix3.setColumn(r, 1, t, r),
          Cesium.Matrix3.setColumn(r, 2, e, r);
        i = Cesium.Quaternion.fromRotationMatrix(r, i);
        return (this.orientation = i);
      }),
      (e.prototype.addCameraFrustum = function () {
        (this.cameraFrustum = new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.FrustumOutlineGeometry({
              origin: this.cameraPosition,
              orientation: this.orientation,
              frustum: this.viewShadowMap._lightCamera.frustum,
              _drawNearPlane: !0,
            }),
            attributes: { color: Cesium.ColorGeometryInstanceAttribute.fromColor(Cesium.Color.YELLOW.withAlpha(0.5)) },
          }),
          appearance: new Cesium.PerInstanceColorAppearance({ translucent: !1, flat: !0 }),
          asynchronous: !1,
          show: this.debugFrustum,
        })),
          this.viewer.scene.primitives.add(this.cameraFrustum);
      }),
      (e.prototype.setFrustumVisible = function (e) {
        this.cameraFrustum && ((this.debugFrustum = e), (this.cameraFrustum.show = this.debugFrustum));
      }),
      (e.prototype.addPostProcess = function () {
        var t = this,
          i = t.viewShadowMap._isPointLight ? t.viewShadowMap._pointBias : t.viewShadowMap._primitiveBias;
        (this.postProcess = new Cesium.PostProcessStage({
          fragmentShader:
            'uniform float mixNum;uniform sampler2D colorTexture;uniform sampler2D stcshadow; uniform sampler2D videoTexture;uniform sampler2D depthTexture;uniform mat4 _shadowMap_matrix; uniform vec4 shadowMap_lightPositionEC; uniform vec4 shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness; uniform vec4 shadowMap_texelSizeDepthBiasAndNormalShadingSmooth; varying vec2 v_textureCoordinates;vec4 toEye(in vec2 uv, in float depth){  vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));  vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);  posInCamera =posInCamera / posInCamera.w;  return posInCamera;}float getDepth(in vec4 depth){  float z_window = czm_unpackDepth(depth);  z_window = czm_reverseLogDepth(z_window);  float n_range = czm_depthRange.near;  float f_range = czm_depthRange.far;  return (2.0 * z_window - n_range - f_range) / (f_range - n_range);}float _czm_sampleShadowMap(sampler2D shadowMap, vec2 uv){  return texture2D(shadowMap, uv).r;}float _czm_shadowDepthCompare(sampler2D shadowMap, vec2 uv, float depth){  return step(depth, _czm_sampleShadowMap(shadowMap, uv));}float _czm_shadowVisibility(sampler2D shadowMap, czm_shadowParameters shadowParameters){  float depthBias = shadowParameters.depthBias;  float depth = shadowParameters.depth;  float nDotL = shadowParameters.nDotL;  float normalShadingSmooth = shadowParameters.normalShadingSmooth;  float darkness = shadowParameters.darkness;  vec2 uv = shadowParameters.texCoords;  depth -= depthBias;  vec2 texelStepSize = shadowParameters.texelStepSize;  float radius = 1.0;  float dx0 = -texelStepSize.x * radius;  float dy0 = -texelStepSize.y * radius;  float dx1 = texelStepSize.x * radius;  float dy1 = texelStepSize.y * radius;  float visibility =   (  _czm_shadowDepthCompare(shadowMap, uv, depth)  +_czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy0), depth) +  _czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy0), depth) +  _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy0), depth) +  _czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, 0.0), depth) +  _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, 0.0), depth) +  _czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy1), depth) +  _czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy1), depth) +  _czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy1), depth)  ) * (1.0 / 9.0)  ;  return visibility;}vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point){  vec3 v01 = point -planeOrigin;  float d = dot(planeNormal, v01) ;  return (point - planeNormal * d);}float ptm(vec3 pt){  return sqrt(pt.x*pt.x + pt.y*pt.y + pt.z*pt.z);}void main() {   const float PI = 3.141592653589793;  vec4 color = texture2D(colorTexture, v_textureCoordinates);  vec4 currD = texture2D(depthTexture, v_textureCoordinates);  if(currD.r>=1.0){ gl_FragColor = color; return;  } float depth = getDepth(currD);  vec4 positionEC = toEye(v_textureCoordinates, depth);  vec3 normalEC = vec3(1.0);  czm_shadowParameters shadowParameters;   shadowParameters.texelStepSize = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.xy;   shadowParameters.depthBias = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.z;   shadowParameters.normalShadingSmooth = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.w;   shadowParameters.darkness = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.w;   shadowParameters.depthBias *= max(depth * 0.01, 1.0);   vec3 directionEC = normalize(positionEC.xyz - shadowMap_lightPositionEC.xyz);   float nDotL = clamp(dot(normalEC, -directionEC), 0.0, 1.0);   vec4 shadowPosition = _shadowMap_matrix * positionEC;   shadowPosition /= shadowPosition.w;   if (any(lessThan(shadowPosition.xyz, vec3(0.0))) || any(greaterThan(shadowPosition.xyz, vec3(1.0))))   {  gl_FragColor = color; return;  }  shadowParameters.texCoords = shadowPosition.xy;   shadowParameters.depth = shadowPosition.z;   shadowParameters.nDotL = nDotL;   float visibility = _czm_shadowVisibility(stcshadow, shadowParameters);   vec4 videoColor = texture2D(videoTexture,shadowPosition.xy);  if(visibility==1.0){ gl_FragColor = mix(color,vec4(videoColor.xyz,1.0),mixNum*videoColor.a);  }else{ if(abs(shadowPosition.z-0.0)<0.01){   return; } gl_FragColor = color;  }} ',
          uniforms: {
            mixNum: function () {
              return t.alpha;
            },
            stcshadow: function () {
              return t.viewShadowMap._shadowMapTexture;
            },
            videoTexture: function () {
              return t.videoTexture;
            },
            _shadowMap_matrix: function () {
              return t.viewShadowMap._shadowMapMatrix;
            },
            shadowMap_lightPositionEC: function () {
              return t.viewShadowMap._lightPositionEC;
            },
            shadowMap_texelSizeDepthBiasAndNormalShadingSmooth: function () {
              var e = new Cesium.Cartesian2();
              return (
                (e.x = 1 / t.viewShadowMap._textureSize.x),
                (e.y = 1 / t.viewShadowMap._textureSize.y),
                Cesium.Cartesian4.fromElements(e.x, e.y, i.depthBias, i.normalShadingSmooth, this.combinedUniforms1)
              );
            },
            shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness: function () {
              return Cesium.Cartesian4.fromElements(
                i.normalOffsetScale,
                t.viewShadowMap._distance,
                t.viewShadowMap.maximumDistance,
                t.viewShadowMap._darkness,
                this.combinedUniforms2,
              );
            },
          },
        })),
          this.viewer.scene.postProcessStages.add(this.postProcess);
      }),
      (e.prototype.destroy = function () {
        this.viewer.scene.postProcessStages.remove(this.postProcess),
          this.viewer.scene.primitives.remove(this.cameraFrustum),
          this.activeVideoListener && this.viewer.clock.onTick.removeEventListener(this.activeVideoListener),
          this.activeVideoListener && delete this.activeVideoListener,
          delete this.postProcess,
          delete this.viewShadowMap,
          delete this.cameraPosition,
          delete this.position,
          delete this.alpha,
          delete this._camerafov,
          delete this._cameraPosition,
          delete this.videoTexture,
          delete this.cameraFrustum,
          delete this._debugFrustum,
          delete this._position,
          delete this._aspectRatio,
          delete this.url,
          delete this.orientation,
          this.viewer.scene.primitives.remove(this),
          delete this.viewer;
      });
  })(),
  (function () {
    var e = (TMap3D.Application.CircleAnalysis = function (e) {
      (this.viewer = e),
        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
        ),
        this.initEvents();
    });
    (e.prototype.activate = function () {
      this.deactivate(),
        this.clear(),
        (this.positions = []),
        (this.tempPositions = []),
        this.registerEvents(),
        (this.viewer.enableCursorStyle = !1),
        (this.viewer._element.style.cursor = 'default');
    }),
      (e.prototype.deactivate = function () {
        this.unRegisterEvents(), (this.viewer._element.style.cursor = 'pointer'), (this.viewer.enableCursorStyle = !0);
      }),
      (e.prototype.clear = function () {
        var t = this;
        this.circleEntity && (this.viewer.entities.remove(this.circleEntity), (this.circleEntity = void 0)),
          this.viewEntity && (this.viewer.entities.remove(this.viewEntity), (this.viewEntity = void 0)),
          this.resultPolylines &&
            this.resultPolylines.forEach(function (e) {
              t.viewer.entities.remove(e);
            });
      }),
      (e.prototype.initEvents = function () {
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
      }),
      (e.prototype.registerEvents = function () {
        this.leftClickEvent(), this.rightClickEvent(), this.mouseMoveEvent();
      }),
      (e.prototype.leftClickEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          i.viewer._element.style.cursor = 'default';
          var t = i.viewer.scene.pickPosition(e.position);
          (t = t || i.viewer.scene.camera.pickEllipsoid(e.position, i.viewer.scene.globe.ellipsoid)) &&
            (i.positions.push(t),
            1 == i.positions.length ? (i.tempPositions.push(t), i.handleFirstPosition()) : i.drawEnd());
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.handleFirstPosition = function () {
        this.generateView(), this.generateCircle();
      }),
      (e.prototype.generateCircle = function () {
        var t = this;
        this.circleEntity = this.viewer.entities.add({
          position: this.positions[0],
          ellipse: {
            semiMinorAxis: new Cesium.CallbackProperty(function (e) {
              return t.getRadius();
            }, !1),
            semiMajorAxis: new Cesium.CallbackProperty(function (e) {
              return t.getRadius();
            }, !1),
            material: Cesium.Color.RED.withAlpha(0.6),
            classificationType: Cesium.ClassificationType.BOTH,
          },
        });
      }),
      (e.prototype.getRadius = function () {
        var e = this.tempPositions[0],
          t = this.tempPositions[0];
        1 < this.tempPositions.length && (t = this.tempPositions[1]);
        t = Cesium.Cartesian3.distance(e, t);
        return 0 == t ? 1e-6 : t;
      }),
      (e.prototype.generateView = function () {
        this.viewEntity = this.viewer.entities.add({
          position: this.positions[0],
          label: {
            text: '观察位置',
            fillColor: Cesium.Color.WHITE,
            scale: 0.5,
            font: 'normal 34px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e3),
            scaleByDistance: new Cesium.NearFarScalar(500, 1, 1500, 0.4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -20),
            outlineWidth: 3,
            outlineColor: Cesium.Color.BLACK,
          },
          point: {
            color: Cesium.Color.DODGERBLUE,
            pixelSize: 5,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            scaleByDistance: new Cesium.NearFarScalar(1e3, 1, 4200, 0.4),
            disableDepthTestDistance: 500,
          },
        });
      }),
      (e.prototype.mouseMoveEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          i.viewer._element.style.cursor = 'default';
          var t = i.viewer.scene.pickPosition(e.endPosition);
          (t = t || i.viewer.scene.camera.pickEllipsoid(e.startPosition, i.viewer.scene.globe.ellipsoid)) &&
            i.circleEntity &&
            (i.tempPositions = i.positions.concat([t]));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.rightClickEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          t.circleEntity ? t.positions.length < 2 && (t.clear(), t.deactivate()) : t.deactivate();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.unRegisterEvents = function () {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      }),
      (e.prototype.drawEnd = function () {
        this.startnalysis(), this.viewer.entities.remove(this.circleEntity), this.deactivate();
      }),
      (e.prototype.startnalysis = function () {
        var e = Cesium.Cartographic.fromCartesian(this.positions[0]),
          e = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude)],
          e = this.generateCirclePoints(e, this.getRadius()),
          t = this.point2dToPoint3d(e);
        this.resultPolylines = [];
        for (var i, o, n, r, s = 0; s < t.length; s++)
          (i = Cesium.Cartesian3.normalize(
            Cesium.Cartesian3.subtract(t[s], this.positions[0], new Cesium.Cartesian3()),
            new Cesium.Cartesian3(),
          )),
            (o = new Cesium.Ray(this.positions[0], i)),
            (n = this.viewer.scene.pickFromRay(o, [this.viewEntity, this.targetEntity])),
            (r = this.showIntersection(n, t[s], this.positions[0])),
            (this.resultPolylines = this.resultPolylines.concat(r));
      }),
      (e.prototype.point2dToPoint3d = function (e) {
        for (var t = [], i = 0; i < e.length; i++) {
          var o = e[i],
            o = Cesium.Cartesian3.fromDegrees(o[0], o[1], 0),
            o = this.viewer.scene.clampToHeight(o);
          t.push(o);
        }
        return t;
      }),
      (e.prototype.generateCirclePoints = function (e, t) {
        for (var i = [], o = 0; o < 360; o += 2) i.push(this.getCirclePoint(e[0], e[1], o, t));
        return i;
      }),
      (e.prototype.getCirclePoint = function (e, t, i, o) {
        var n = o * Math.sin((i * Math.PI) / 180),
          o = o * Math.cos((i * Math.PI) / 180),
          i = 6356725 + (21412 * (90 - t)) / 90;
        return [
          (180 * (n / (i * Math.cos((t * Math.PI) / 180)) + (e * Math.PI) / 180)) / Math.PI,
          (180 * (o / i + (t * Math.PI) / 180)) / Math.PI,
        ];
      }),
      (e.prototype.showIntersection = function (e, t, i) {
        var o = [],
          n = void 0,
          n =
            Cesium.defined(e) && Cesium.defined(e.object)
              ? ((n = this.drawResultLine(e.position, i, Cesium.Color.CHARTREUSE)),
                o.push(n),
                this.drawResultLine(e.position, t, Cesium.Color.RED))
              : this.drawResultLine(i, t, Cesium.Color.CHARTREUSE);
        return o.push(n), o;
      }),
      (e.prototype.drawResultLine = function (e, t, i) {
        return this.viewer.entities.add({
          polyline: { positions: [e, t], width: 2, material: i, depthFailMaterial: i },
        });
      });
  })(),
  (function () {
    var e = (TMap3D.Application.SightLine = function (e) {
      (this.viewer = e),
        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
        ),
        this.initEvents();
    });
    (e.prototype.activate = function () {
      this.deactivate(),
        this.clear(),
        (this.positions = []),
        (this.tempPositions = []),
        this.registerEvents(),
        (this.viewer.enableCursorStyle = !1),
        (this.viewer._element.style.cursor = 'default');
    }),
      (e.prototype.deactivate = function () {
        this.unRegisterEvents(), (this.viewer._element.style.cursor = 'pointer'), (this.viewer.enableCursorStyle = !0);
      }),
      (e.prototype.clear = function () {
        var t = this;
        this.polylineEntity && (this.viewer.entities.remove(this.polylineEntity), (this.polylineEntity = void 0)),
          this.viewEntity && (this.viewer.entities.remove(this.viewEntity), (this.viewEntity = void 0)),
          this.targetEntity && (this.viewer.entities.remove(this.targetEntity), (this.targetEntity = void 0)),
          this.resultPolylines &&
            this.resultPolylines.forEach(function (e) {
              t.viewer.entities.remove(e);
            });
      }),
      (e.prototype.destory = function () {
        this.clear(), this.handler.destroy();
      }),
      (e.prototype.initEvents = function () {
        this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
      }),
      (e.prototype.registerEvents = function () {
        this.leftClickEvent(), this.rightClickEvent(), this.mouseMoveEvent();
      }),
      (e.prototype.leftClickEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          i.viewer._element.style.cursor = 'default';
          var t = i.viewer.scene.pickPosition(e.position);
          (t = t || i.viewer.scene.camera.pickEllipsoid(e.position, i.viewer.scene.globe.ellipsoid)) &&
            (i.positions.push(t), 1 == i.positions.length ? i.handleFirstPosition() : i.drawEnd());
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.handleFirstPosition = function () {
        this.generateView(), this.generatePolyline();
      }),
      (e.prototype.generatePolyline = function () {
        var t = this;
        this.polylineEntity = this.viewer.entities.add({
          polyline: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.tempPositions;
            }, !1),
            width: 2,
            material: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
          },
        });
      }),
      (e.prototype.generateView = function () {
        this.viewEntity = this.viewer.entities.add({
          position: this.positions[0],
          label: {
            text: '观察位置',
            fillColor: Cesium.Color.WHITE,
            scale: 0.5,
            font: 'normal 34px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e3),
            scaleByDistance: new Cesium.NearFarScalar(500, 1, 1500, 0.4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -20),
            outlineWidth: 3,
            outlineColor: Cesium.Color.BLACK,
          },
          point: {
            color: Cesium.Color.DODGERBLUE,
            pixelSize: 5,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            scaleByDistance: new Cesium.NearFarScalar(1e3, 1, 4200, 0.4),
            disableDepthTestDistance: 500,
          },
        });
      }),
      (e.prototype.generateEndPoint = function () {
        this.targetEntity = this.viewer.entities.add({
          position: this.positions[1],
          label: {
            text: '目标位置',
            fillColor: Cesium.Color.WHITE,
            scale: 0.5,
            font: 'normal 34px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e3),
            scaleByDistance: new Cesium.NearFarScalar(500, 1, 1500, 0.4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -20),
            outlineWidth: 3,
            outlineColor: Cesium.Color.BLACK,
          },
          point: {
            color: Cesium.Color.DODGERBLUE,
            pixelSize: 5,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2,
            scaleByDistance: new Cesium.NearFarScalar(1e3, 1, 4200, 0.4),
            disableDepthTestDistance: 500,
          },
        });
      }),
      (e.prototype.mouseMoveEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          i.viewer._element.style.cursor = 'default';
          var t = i.viewer.scene.pickPosition(e.endPosition);
          (t = t || i.viewer.scene.camera.pickEllipsoid(e.startPosition, i.viewer.scene.globe.ellipsoid)) &&
            i.polylineEntity &&
            (i.tempPositions = i.positions.concat([t]));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.rightClickEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          t.polylineEntity ? t.positions.length < 2 && (t.clear(), t.deactivate()) : t.deactivate();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.unRegisterEvents = function () {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      }),
      (e.prototype.drawEnd = function () {
        this.generateEndPoint(),
          this.startnalysis(),
          this.viewer.entities.remove(this.polylineEntity),
          this.deactivate();
      }),
      (e.prototype.startnalysis = function () {
        var e = Cesium.Cartesian3.normalize(
            Cesium.Cartesian3.subtract(this.positions[1], this.positions[0], new Cesium.Cartesian3()),
            new Cesium.Cartesian3(),
          ),
          e = new Cesium.Ray(this.positions[0], e),
          e = this.viewer.scene.pickFromRay(e, [this.viewEntity, this.targetEntity]);
        this.resultPolylines = this.showIntersection(e, this.positions[1], this.positions[0]);
      }),
      (e.prototype.showIntersection = function (e, t, i) {
        var o = [],
          n = void 0,
          n =
            Cesium.defined(e) && Cesium.defined(e.object)
              ? ((n = this.drawResultLine(e.position, i, Cesium.Color.CHARTREUSE)),
                o.push(n),
                this.drawResultLine(e.position, t, Cesium.Color.RED))
              : this.drawResultLine(i, t, Cesium.Color.CHARTREUSE);
        return o.push(n), o;
      }),
      (e.prototype.drawResultLine = function (e, t, i) {
        return this.viewer.entities.add({
          polyline: { positions: [e, t], width: 2, material: i, depthFailMaterial: i },
        });
      });
  })(),
  (function () {
    var e = (TMap3D.Application.ViewShedStage = function (e, t) {
      (this.viewer = e),
        (this.viewPosition = t.viewPosition),
        (this.viewPositionEnd = t.viewPositionEnd),
        (this.viewDistance = t.viewDistance),
        (this.viewHeading = t.viewHeading),
        (this.viewPitch = t.viewPitch),
        (this.horizontalViewAngle = t.horizontalViewAngle || 90),
        (this.verticalViewAngle = t.verticalViewAngle || 60),
        (this.visibleAreaColor = t.visibleAreaColor || Cesium.Color.LIME),
        (this.invisibleAreaColor = t.invisibleAreaColor || Cesium.Color.RED),
        (this.enabled = 'boolean' != typeof t.enabled || t.enabled),
        (this.softShadows = 'boolean' != typeof t.softShadows || t.softShadows),
        (this.size = t.size || 2048),
        this.add();
    });
    (e.prototype.add = function () {
      this.createLightCamera(),
        this.createShadowMap(),
        this.createPostStage(),
        this.drawFrustumOutline(),
        this.drawSketch();
    }),
      (e.prototype.clear = function () {
        this.sketch && (this.viewer.entities.removeById(this.sketch.id), (this.sketch = null)),
          this.frustumOutline && (this.viewer.entities.remove(this.frustumOutline), (this.frustumOutline = null)),
          this.postStage && (this.viewer.scene.postProcessStages.remove(this.postStage), (this.postStage = null));
      }),
      (e.prototype.createLightCamera = function () {
        (this.lightCamera = new Cesium.Camera(this.viewer.scene)),
          (this.lightCamera.position = this.viewPosition),
          (this.lightCamera.frustum.near = 0.001 * this.viewDistance),
          (this.lightCamera.frustum.far = this.viewDistance);
        var e = Cesium.Math.toRadians(this.horizontalViewAngle),
          t = Cesium.Math.toRadians(this.verticalViewAngle),
          i = (this.viewDistance * Math.tan(e / 2) * 2) / (this.viewDistance * Math.tan(t / 2) * 2);
        (this.lightCamera.frustum.aspectRatio = i),
          (this.lightCamera.frustum.fov = t < e ? e : t),
          this.lightCamera.setView({
            destination: this.viewPosition,
            orientation: {
              heading: Cesium.Math.toRadians(this.viewHeading || 0),
              pitch: Cesium.Math.toRadians(this.viewPitch || 0),
              roll: 0,
            },
          });
      }),
      (e.prototype.createShadowMap = function () {
        (this.shadowMap = new Cesium.ShadowMap({
          context: this.viewer.scene.context,
          lightCamera: this.lightCamera,
          enabled: this.enabled,
          isPointLight: !0,
          pointLightRadius: this.viewDistance,
          cascadesEnabled: !1,
          size: this.size,
          softShadows: this.softShadows,
          normalOffset: !1,
          fromLightSource: !1,
        })),
          (this.viewer.scene.shadowMap = this.shadowMap);
      }),
      (e.prototype.createPostStage = function () {
        var i = this,
          e = new Cesium.PostProcessStage({
            fragmentShader:
              '\n#define USE_CUBE_MAP_SHADOW true\nuniform sampler2D colorTexture;\nuniform sampler2D depthTexture;\nvarying vec2 v_textureCoordinates;\nuniform mat4 camera_projection_matrix;\nuniform mat4 camera_view_matrix;\nuniform samplerCube shadowMap_textureCube;\nuniform mat4 shadowMap_matrix;\nuniform vec4 shadowMap_lightPositionEC;\nuniform vec4 shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness;\nuniform vec4 shadowMap_texelSizeDepthBiasAndNormalShadingSmooth;\nuniform float x_viewDistance; \nuniform vec4 x_visibleAreaColor;\nuniform vec4 x_invisibleAreaColor;\nstruct zx_shadowParameters\n{\n    vec3 texCoords;\n    float depthBias;\n    float depth;\n    float nDotL;\n    vec2 texelStepSize;\n    float normalShadingSmooth;\n    float darkness;\n};\nfloat czm_shadowVisibility(samplerCube shadowMap, zx_shadowParameters shadowParameters)\n{\n    float depthBias = shadowParameters.depthBias;\n    float depth = shadowParameters.depth;\n    float nDotL = shadowParameters.nDotL;\n    float normalShadingSmooth = shadowParameters.normalShadingSmooth;\n    float darkness = shadowParameters.darkness;\n    vec3 uvw = shadowParameters.texCoords;\n    depth -= depthBias;\n    float visibility = czm_shadowDepthCompare(shadowMap, uvw, depth);\n    return czm_private_shadowVisibility(visibility, nDotL, normalShadingSmooth, darkness);\n}\nvec4 getPositionEC(){\n    return czm_windowToEyeCoordinates(gl_FragCoord);\n}\nvec3 getNormalEC(){\n    return vec3(1.);\n}\nvec4 toEye(in vec2 uv,in float depth){\n    vec2 xy=vec2((uv.x*2.-1.),(uv.y*2.-1.));\n    vec4 posInCamera=czm_inverseProjection*vec4(xy,depth,1.);\n    posInCamera=posInCamera/posInCamera.w;\n    return posInCamera;\n}\nvec3 pointProjectOnPlane(in vec3 planeNormal,in vec3 planeOrigin,in vec3 point){\n    vec3 v01=point-planeOrigin;\n    float d=dot(planeNormal,v01);\n    return(point-planeNormal*d);\n}\nfloat getDepth(in vec4 depth){\n    float z_window=czm_unpackDepth(depth);\n    z_window=czm_reverseLogDepth(z_window);\n    float n_range=czm_depthRange.near;\n    float f_range=czm_depthRange.far;\n    return(2.*z_window-n_range-f_range)/(f_range-n_range);\n}\nfloat shadow(in vec4 positionEC){\n    vec3 normalEC=getNormalEC();\n    zx_shadowParameters shadowParameters;\n    shadowParameters.texelStepSize=shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.xy;\n    shadowParameters.depthBias=shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.z;\n    shadowParameters.normalShadingSmooth=shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.w;\n    shadowParameters.darkness=shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.w;\n    vec3 directionEC=positionEC.xyz-shadowMap_lightPositionEC.xyz;\n    float distance=length(directionEC);\n    directionEC=normalize(directionEC);\n    float radius=shadowMap_lightPositionEC.w;\n    if(distance>radius)\n    {\n        return 2.0;\n    }\n    vec3 directionWC=czm_inverseViewRotation*directionEC;\n    shadowParameters.depth=distance/radius-0.0003;\n    shadowParameters.nDotL=clamp(dot(normalEC,-directionEC),0.,1.);\n    shadowParameters.texCoords=directionWC;\n    float visibility=czm_shadowVisibility(shadowMap_textureCube,shadowParameters);\n    return visibility;\n}\nbool visible(in vec4 result)\n{\n    result.x/=result.w;\n    result.y/=result.w;\n    result.z/=result.w;\n    return result.x>=-1.&&result.x<=1.\n    &&result.y>=-1.&&result.y<=1.\n    &&result.z>=-1.&&result.z<=1.;\n}\nvoid main(){\n    // 釉色 = 结构二维(颜色纹理, 纹理坐标)\n    gl_FragColor = texture2D(colorTexture, v_textureCoordinates);\n    // 深度 = 获取深度(结构二维(深度纹理, 纹理坐标))\n    float depth = getDepth(texture2D(depthTexture, v_textureCoordinates));\n    // 视角 = (纹理坐标, 深度)\n    vec4 viewPos = toEye(v_textureCoordinates, depth);\n    // 世界坐标\n    vec4 wordPos = czm_inverseView * viewPos;\n    // 虚拟相机中坐标\n    vec4 vcPos = camera_view_matrix * wordPos;\n    float near = .001 * x_viewDistance;\n    float dis = length(vcPos.xyz);\n    if(dis > near && dis < x_viewDistance){\n        // 透视投影\n        vec4 posInEye = camera_projection_matrix * vcPos;\n        // 可视区颜色\n        // vec4 x_visibleAreaColor=vec4(0.,1.,0.,.5);\n        // vec4 x_invisibleAreaColor=vec4(1.,0.,0.,.5);\n        if(visible(posInEye)){\n            float vis = shadow(viewPos);\n            if(vis > 0.3){\n                gl_FragColor = mix(gl_FragColor,x_visibleAreaColor,0.5);\n            } else{\n                gl_FragColor = mix(gl_FragColor,x_invisibleAreaColor,.5);\n            }\n        }\n    }\n}',
            uniforms: {
              shadowMap_textureCube: function () {
                return i.shadowMap.update(i.viewer.scene._frameState), i.shadowMap._shadowMapTexture;
              },
              shadowMap_matrix: function () {
                return i.shadowMap.update(i.viewer.scene._frameState), i.shadowMap._shadowMapMatrix;
              },
              shadowMap_lightPositionEC: function () {
                return i.shadowMap.update(i.viewer.scene._frameState), i.shadowMap._lightPositionEC;
              },
              shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness: function () {
                i.shadowMap.update(i.viewer.scene._frameState);
                var e = i.shadowMap._pointBias;
                return Cesium.Cartesian4.fromElements(
                  e.normalOffsetScale,
                  i.shadowMap._distance,
                  i.shadowMap.maximumDistance,
                  0,
                  new Cesium.Cartesian4(),
                );
              },
              shadowMap_texelSizeDepthBiasAndNormalShadingSmooth: function () {
                i.shadowMap.update(i.viewer.scene._frameState);
                var e = i.shadowMap._pointBias,
                  t = new Cesium.Cartesian2();
                return (
                  (t.x = 1 / i.shadowMap._textureSize.x),
                  (t.y = 1 / i.shadowMap._textureSize.y),
                  Cesium.Cartesian4.fromElements(t.x, t.y, e.depthBias, e.normalShadingSmooth, new Cesium.Cartesian4())
                );
              },
              camera_projection_matrix: this.lightCamera.frustum.projectionMatrix,
              camera_view_matrix: this.lightCamera.viewMatrix,
              x_viewDistance: function () {
                return i.viewDistance;
              },
              x_visibleAreaColor: this.visibleAreaColor,
              x_invisibleAreaColor: this.invisibleAreaColor,
            },
          });
        this.postStage = this.viewer.scene.postProcessStages.add(e);
      }),
      (e.prototype.drawFrustumOutline = function () {
        var t = this;
        this.frustumOutline = this.viewer.entities.add({
          name: 'frustumOutline',
          position: this.viewPosition,
          orientation: new Cesium.CallbackProperty(function (e) {
            return Cesium.Transforms.headingPitchRollQuaternion(
              t.viewPosition,
              Cesium.HeadingPitchRoll.fromDegrees(t.viewHeading - t.horizontalViewAngle, t.viewPitch, 0),
            );
          }, !1),
          ellipsoid: {
            radii: new Cesium.CallbackProperty(function (e) {
              return new Cesium.Cartesian3(t.viewDistance, t.viewDistance, t.viewDistance);
            }, !1),
            innerRadii: new Cesium.Cartesian3(0.01, 0.01, 0.01),
            minimumClock: new Cesium.CallbackProperty(function (e) {
              return Cesium.Math.toRadians(-t.horizontalViewAngle / 2);
            }, !1),
            maximumClock: new Cesium.CallbackProperty(function (e) {
              return Cesium.Math.toRadians(t.horizontalViewAngle / 2);
            }, !1),
            minimumCone: Cesium.Math.toRadians(this.verticalViewAngle + 7.75),
            maximumCone: Cesium.Math.toRadians(180 - this.verticalViewAngle - 7.75),
            fill: !1,
            outline: !0,
            outlineColor: Cesium.Color.AQUA,
          },
        });
      }),
      (e.prototype.drawSketch = function () {
        var t = this;
        this.sketch = this.viewer.entities.add({
          name: 'sketch',
          position: this.viewPosition,
          orientation: new Cesium.CallbackProperty(function (e) {
            return Cesium.Transforms.headingPitchRollQuaternion(
              t.viewPosition,
              Cesium.HeadingPitchRoll.fromDegrees(t.viewHeading - t.horizontalViewAngle, t.viewPitch, 0),
            );
          }, !1),
          ellipsoid: {
            radii: new Cesium.CallbackProperty(function (e) {
              return new Cesium.Cartesian3(t.viewDistance, t.viewDistance, t.viewDistance);
            }, !1),
            minimumClock: new Cesium.CallbackProperty(function (e) {
              return Cesium.Math.toRadians(-t.horizontalViewAngle / 2);
            }, !1),
            maximumClock: new Cesium.CallbackProperty(function (e) {
              return Cesium.Math.toRadians(t.horizontalViewAngle / 2);
            }, !1),
            minimumCone: Cesium.Math.toRadians(this.verticalViewAngle + 7.75),
            maximumCone: Cesium.Math.toRadians(180 - this.verticalViewAngle - 7.75),
            fill: !1,
            outline: !0,
            subdivisions: 256,
            stackPartitions: 64,
            slicePartitions: 64,
            outlineColor: Cesium.Color.AQUA,
          },
        });
      });
  })(),
  (function () {
    var i = {
      font: '50px 楷体',
      fill: !0,
      fillColor: new Cesium.Color(1, 1, 0, 1),
      stroke: !0,
      strokeWidth: 2,
      strokeColor: new Cesium.Color(1, 1, 1, 0.8),
      backgroundColor: new Cesium.Color(1, 1, 1, 0.1),
      textBaseline: 'top',
      padding: 40,
    };
    TMap3D.VIDEOTYPE = { Color: 1, Image: 2, Video: 3, Text: 4 };
    var e = {};
    e.default = [
      'uniform float mixNum;',
      'uniform sampler2D colorTexture;',
      'uniform sampler2D marsShadow; ',
      'uniform sampler2D videoTexture;',
      'uniform sampler2D depthTexture;',
      'uniform mat4 _shadowMap_matrix;',
      'uniform vec4 shadowMap_lightPositionEC; ',
      'uniform vec4 shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness; ',
      'uniform vec4 shadowMap_texelSizeDepthBiasAndNormalShadingSmooth; ',
      'uniform vec4 disViewColor;',
      'uniform bool clearBlack;',
      'varying vec2 v_textureCoordinates;',
      'vec4 toEye(in vec2 uv, in float depth){',
      '    vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));',
      '    vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);',
      '    posInCamera =posInCamera / posInCamera.w;',
      '    return posInCamera;',
      '}',
      'float getDepth(in vec4 depth){',
      '    float z_window = czm_unpackDepth(depth);',
      '    z_window = czm_reverseLogDepth(z_window);',
      '    float n_range = czm_depthRange.near;',
      '    float f_range = czm_depthRange.far;',
      '    return (2.0 * z_window - n_range - f_range) / (f_range - n_range);',
      '}',
      'float _czm_sampleShadowMap(sampler2D shadowMap, vec2 uv){',
      '    return texture2D(shadowMap, uv).r;',
      '}',
      'float _czm_shadowDepthCompare(sampler2D shadowMap, vec2 uv, float depth){',
      '    return step(depth, _czm_sampleShadowMap(shadowMap, uv));',
      '}',
      'float _czm_shadowVisibility(sampler2D shadowMap, czm_shadowParameters shadowParameters){',
      '    float depthBias = shadowParameters.depthBias;',
      '    float depth = shadowParameters.depth;',
      'float nDotL = shadowParameters.nDotL;',
      'float normalShadingSmooth = shadowParameters.normalShadingSmooth;',
      'float darkness = shadowParameters.darkness;',
      'vec2 uv = shadowParameters.texCoords;',
      'depth -= depthBias;',
      'vec2 texelStepSize = shadowParameters.texelStepSize;',
      'float radius = 1.0;',
      'float dx0 = -texelStepSize.x * radius;',
      'float dy0 = -texelStepSize.y * radius;',
      'float dx1 = texelStepSize.x * radius;',
      'float dy1 = texelStepSize.y * radius;',
      'float visibility = ',
      '(',
      '_czm_shadowDepthCompare(shadowMap, uv, depth)',
      '+_czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy0), depth) +',
      '_czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy0), depth) +',
      '_czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy0), depth) +',
      '_czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, 0.0), depth) +',
      '_czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, 0.0), depth) +',
      '_czm_shadowDepthCompare(shadowMap, uv + vec2(dx0, dy1), depth) +',
      '_czm_shadowDepthCompare(shadowMap, uv + vec2(0.0, dy1), depth) +',
      '_czm_shadowDepthCompare(shadowMap, uv + vec2(dx1, dy1), depth)',
      ') * (1.0 / 9.0)',
      ';',
      'return visibility;',
      '}',
      'vec3 pointProjectOnPlane(in vec3 planeNormal, in vec3 planeOrigin, in vec3 point){',
      '    vec3 v01 = point -planeOrigin;',
      '    float d = dot(planeNormal, v01) ;',
      '    return (point - planeNormal * d);',
      '}',
      'float ptm(vec3 pt){',
      '    return sqrt(pt.x*pt.x + pt.y*pt.y + pt.z*pt.z);',
      '}',
      'void main() ',
      '{ ',
      '    const float PI = 3.141592653589793;',
      '    vec4 color = texture2D(colorTexture, v_textureCoordinates);',
      '    vec4 currD = texture2D(depthTexture, v_textureCoordinates);',
      '    if(currD.r>=1.0){',
      '        gl_FragColor = color;',
      '        return;',
      '    }',
      '    float depth = getDepth(currD);',
      '    vec4 positionEC = toEye(v_textureCoordinates, depth);',
      '    vec3 normalEC = vec3(1.0);',
      '    czm_shadowParameters shadowParameters; ',
      '    shadowParameters.texelStepSize = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.xy; ',
      '    shadowParameters.depthBias = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.z; ',
      '    shadowParameters.normalShadingSmooth = shadowMap_texelSizeDepthBiasAndNormalShadingSmooth.w; ',
      '    shadowParameters.darkness = shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness.w; ',
      '    shadowParameters.depthBias *= max(depth * 0.01, 1.0); ',
      '    vec3 directionEC = normalize(positionEC.xyz - shadowMap_lightPositionEC.xyz); ',
      '    float nDotL = clamp(dot(normalEC, -directionEC), 0.0, 1.0); ',
      '    vec4 shadowPosition = _shadowMap_matrix * positionEC; ',
      '    shadowPosition /= shadowPosition.w; ',
      '    if (any(lessThan(shadowPosition.xyz, vec3(0.0))) || any(greaterThan(shadowPosition.xyz, vec3(1.0)))) ',
      '    { ',
      '        gl_FragColor = color;',
      '        return;',
      '    }',
      '    shadowParameters.texCoords = shadowPosition.xy; ',
      '    shadowParameters.depth = shadowPosition.z; ',
      '    shadowParameters.nDotL = nDotL; ',
      '    float visibility = _czm_shadowVisibility(marsShadow, shadowParameters);',
      '    vec4 videoColor = texture2D(videoTexture,shadowPosition.xy);',
      '    if(clearBlack){',
      '        if(videoColor.r + videoColor.g + videoColor.b <0.01){',
      '            gl_FragColor = color;',
      '            return;',
      '        }',
      '}',
      'if(visibility==1.0){',
      '    gl_FragColor = mix(color,vec4(videoColor.xyz,1.0),mixNum*videoColor.a);',
      '}else{',
      '    if(abs(shadowPosition.z-0.0)<0.01){',
      '        return;',
      '    }',
      '    if(clearBlack){',
      '        gl_FragColor = color;',
      '        return;',
      '   }',
      '   gl_FragColor = vec4(mix(color.rgb,disViewColor.rgb,disViewColor.a),disViewColor.a);',
      '}',
      '}',
    ].join('\n');
    var t = (TMap3D.Application.Video3D = function (e, t) {
      (this.viewer = e),
        (t = t || {}),
        this.addProperty(),
        Cesium.defined(t.debugFrustum) && (t.showFrustum = t.debugFrustum),
        (this.debugFrustum = this.showFrustum),
        (this._cameraPosition = t.cameraPosition),
        (this._position = t.position),
        (this.type = t.type),
        (this.alpha = t.alpha || 1),
        (this.color = t.color),
        (this._debugFrustum = Cesium.defaultValue(t.showFrustum, !0)),
        (this._aspectRatio = t.aspectRatio || this._getWinWidHei());
      e = t.fov && Cesium.Math.toRadians(t.fov);
      if (
        ((this._cameraFov = e || this.viewer.scene.camera.frustum.fov),
        (this.videoTexture = this.texture =
          t.texture ||
          new Cesium.Texture({
            context: this.viewer.scene.context,
            source: { width: 1, height: 1, arrayBufferView: new Uint8Array([255, 255, 255, 255]) },
            flipY: !1,
          })),
        (this._videoPlay = Cesium.defaultValue(t.videoPlay, !0)),
        (this.defaultShow = Cesium.defaultValue(t.show, !0)),
        (this.clearBlack = Cesium.defaultValue(t.clearBlack, !1)),
        (this._rotateDeg = 1),
        (this._dirObj = Cesium.defaultValue(t.dirObj, void 0)),
        (this.text = Cesium.defaultValue(t.text, void 0)),
        (this.textStyles = Cesium.defaultValue(t.textStyles, i)),
        (this._disViewColor = Cesium.defaultValue(t.disViewColor, new Cesium.Color(0, 0, 0, 0.5))),
        this.cameraPosition && this.position)
      ) {
        switch (
          (t.dom &&
            ((this.dom = t.dom),
            this.dom instanceof HTMLElement && (this.dom = t.dom),
            t.dom instanceof Object && t.dom.length && (this.dom = t.dom[0])),
          (this.url = t.url),
          this.type)
        ) {
          default:
          case TMap3D.VIDEOTYPE.Video:
            this.activeVideo(this.url);
            break;
          case TMap3D.VIDEOTYPE.Image:
            this.activePicture(this.url), this.deActiveVideo();
            break;
          case TMap3D.VIDEOTYPE.Color:
            this.activeColor(this.color), this.deActiveVideo();
            break;
          case TMap3D.VIDEOTYPE.Text:
            this.activeText(this.text, this.textStyles), this.deActiveVideo();
        }
        this._createShadowMap(),
          this._getOrientation(),
          this._addCameraFrustum(),
          this._addPostProcess(),
          this.viewer.scene.primitives.add(this);
      } else console.warn('位置坐标错误');
    });
    (t.prototype.addProperty = function () {
      Object.defineProperty(this, 'alpha', {
        get: function () {
          return this._alpha;
        },
        set: function (e) {
          this._alpha = e;
        },
      }),
        Object.defineProperty(this, 'aspectRatio', {
          get: function () {
            return this._aspectRatio;
          },
          set: function (e) {
            (this._aspectRatio = e), this._changeVideoWidHei();
          },
        }),
        Object.defineProperty(this, 'showFrustum', {
          get: function () {
            return this._debugFrustum;
          },
          set: function (e) {
            (this._debugFrustum = e), (this.cameraFrustum.show = e);
          },
        }),
        Object.defineProperty(this, 'fov', {
          get: function () {
            return this._cameraFov;
          },
          set: function (e) {
            (this._cameraFov = Cesium.Math.toRadians(e)), this._changeCameraFov();
          },
        }),
        Object.defineProperty(this, 'cameraPosition', {
          get: function () {
            return this._cameraPosition;
          },
          set: function (e) {
            e && ((this._cameraPosition = e), this._changeCameraPos());
          },
        }),
        Object.defineProperty(this, 'position', {
          get: function () {
            return this._position;
          },
          set: function (e) {
            e && ((this._position = e), this._changeViewPos());
          },
        }),
        Object.defineProperty(this, 'videoPlay', {
          get: function () {
            return this._videoPlay;
          },
          set: function (e) {
            e &&
              ((this._videoPlay = Boolean(e)),
              this.videoElement && (this.videoPlay ? this.videoElement.play() : this.videoElement.pause()));
          },
        }),
        Object.defineProperty(this, 'params', {
          get: function () {
            var e = {};
            return (
              (e.type = this.type),
              this.type == TMap3D.VIDEOTYPE.Color ? (e.color = this.color) : (e.url = this.url),
              (e.position = this.position),
              (e.cameraPosition = this.cameraPosition),
              (e.fov = Cesium.Math.toDegrees(this.fov)),
              (e.aspectRatio = this.aspectRatio),
              (e.alpha = this.alpha),
              (e.showFrustum = this.showFrustum),
              (e.dirObj = this._dirObj),
              e
            );
          },
        }),
        Object.defineProperty(this, 'show', {
          get: function () {
            return this.defaultShow;
          },
          set: function (e) {
            (this.defaultShow = Boolean(e)), this._switchShow();
          },
        }),
        Object.defineProperty(this, 'camera', {
          get: function () {
            return this.viewShadowMap._lightCamera;
          },
        }),
        Object.defineProperty(this, 'disViewColor', {
          get: function () {
            return this._disViewColor;
          },
          set: function (e) {
            e && ((this._disViewColor = e).a || 0 == e.a || (this._disViewColor.a = 1));
          },
        });
    }),
      (t.prototype.rotateCamera = function (e, t) {
        var i = Cesium.defaultValue(t, this._rotateDeg);
        switch (e) {
          case 'Z':
            break;
          case '-Z':
            i *= -1;
            break;
          case 'Y':
            break;
          case '-Y':
            i *= -1;
            break;
          case 'X':
            break;
          case '-X':
            i *= -1;
        }
        e = this._computedNewViewDir(e, i);
        this.viewer.scene.postProcessStages.remove(this.postProcess),
          this.viewer.scene.primitives.remove(this.cameraFrustum),
          this.viewShadowMap.destroy(),
          this.cameraFrustum.destroy(),
          this._resetCameraDir(e),
          this._getOrientation(),
          this._addCameraFrustum(),
          this._addPostProcess();
      }),
      (t.prototype._resetCameraDir = function (e) {
        e && e.up && e.right && e.direction && ((this._dirObj = e), this._createShadowMap());
      }),
      (t.prototype._computedNewViewDir = function (e, t) {
        t = Cesium.Math.toRadians(t);
        var i = this.viewShadowMap._lightCamera,
          o = Cesium.clone(i.direction),
          n = Cesium.clone(i.right),
          r = Cesium.clone(i.up),
          s = new Cesium.Matrix3();
        switch (e) {
          case 'Z':
          case '-Z':
            Cesium.Matrix3.fromRotationZ(t, s);
            break;
          case 'Y':
          case '-Y':
            Cesium.Matrix3.fromRotationY(t, s);
            break;
          case 'X':
          case '-X':
            Cesium.Matrix3.fromRotationX(t, s);
        }
        (e = Cesium.Transforms.eastNorthUpToFixedFrame(i.position)),
          (i = Cesium.Matrix4.inverse(e, new Cesium.Matrix4())),
          (o = Cesium.Matrix4.multiplyByPointAsVector(i, o, new Cesium.Cartesian3())),
          (o = Cesium.Matrix3.multiplyByVector(s, o, new Cesium.Cartesian3())),
          (o = Cesium.Matrix4.multiplyByPointAsVector(e, o, new Cesium.Cartesian3())),
          (n = Cesium.Matrix4.multiplyByPointAsVector(i, n, new Cesium.Cartesian3())),
          (n = Cesium.Matrix3.multiplyByVector(s, n, new Cesium.Cartesian3())),
          (n = Cesium.Matrix4.multiplyByPointAsVector(e, n, new Cesium.Cartesian3())),
          (r = Cesium.Matrix4.multiplyByPointAsVector(i, r, new Cesium.Cartesian3())),
          (r = Cesium.Matrix3.multiplyByVector(s, r, new Cesium.Cartesian3()));
        return { direction: o, right: n, up: Cesium.Matrix4.multiplyByPointAsVector(e, r, new Cesium.Cartesian3()) };
      }),
      (t.prototype.getPercentagePoint = function (e) {
        if (e) {
          var t = this.viewShadowMap._lightCamera._viewMatrix,
            i = this.viewShadowMap._lightCamera.frustum.projectionMatrix,
            e = new Cesium.Cartesian4(e.x, e.y, e.z, 1),
            t = Cesium.Matrix4.multiply(i, t, new Cesium.Matrix4()),
            e = Cesium.Matrix4.multiplyByVector(t, e, new Cesium.Cartesian4()),
            e = new Cesium.Cartesian2(e.x / e.w, e.y / e.w);
          return new Cesium.Cartesian2(e.x / 2 + 0.5, e.y / 2 + 0.5);
        }
      }),
      (t.prototype._changeCameraFov = function () {
        this.viewer.scene.postProcessStages.remove(this.postProcess),
          this.viewer.scene.primitives.remove(this.cameraFrustum),
          this._createShadowMap(),
          this._getOrientation(),
          this._addCameraFrustum(),
          this._addPostProcess();
      }),
      (t.prototype._changeVideoWidHei = function () {
        this.viewer.scene.postProcessStages.remove(this.postProcess),
          this.viewer.scene.primitives.remove(this.cameraFrustum),
          this._createShadowMap(),
          this._getOrientation(),
          this._addCameraFrustum(),
          this._addPostProcess();
      }),
      (t.prototype._changeCameraPos = function () {
        this.viewer.scene.postProcessStages.remove(this.postProcess),
          this.viewer.scene.primitives.remove(this.cameraFrustum),
          this.viewShadowMap.destroy(),
          this.cameraFrustum.destroy(),
          this._createShadowMap(!0),
          this._getOrientation(),
          this._addCameraFrustum(),
          this._addPostProcess();
      }),
      (t.prototype._changeViewPos = function () {
        this.viewer.scene.postProcessStages.remove(this.postProcess),
          this.viewer.scene.primitives.remove(this.cameraFrustum),
          this.viewShadowMap.destroy(),
          this.cameraFrustum.destroy(),
          this._createShadowMap(!0),
          this._getOrientation(),
          this._addCameraFrustum(),
          this._addPostProcess();
      }),
      (t.prototype._switchShow = function () {
        this.show
          ? this.postProcess || this._addPostProcess()
          : (this.viewer.scene.postProcessStages.remove(this.postProcess),
            delete this.postProcess,
            (this.postProcess = null));
      }),
      (t.prototype.activeVideo = function (e) {
        var e = this.dom || this._createVideoEle(e),
          t = this;
        e &&
          ((this.type = TMap3D.VIDEOTYPE.Video),
          (this.videoElement = e).addEventListener('canplaythrough', function () {
            t.viewer && t.viewer.clock.onTick.addEventListener(t.activeVideoListener, t);
          }));
      }),
      (t.prototype.activeVideoListener = function () {
        try {
          this._videoPlay && this.videoElement.paused && this.videoElement.play();
        } catch (e) {}
        this.videoElement &&
          this.viewer &&
          (this.videoTexture && this.videoTexture.destroy(),
          (this.videoTexture = new Cesium.Texture({
            context: this.viewer.scene.context,
            source: this.videoElement,
            pixelFormat: Cesium.PixelFormat.RGBA,
            pixelDatatype: Cesium.PixelDatatype.UNSIGNED_BYTE,
          })));
      }),
      (t.prototype.deActiveVideo = function () {
        this.viewer.clock.onTick.removeEventListener(this.activeVideoListener, this), delete this.activeVideoListener;
      }),
      (t.prototype.activePicture = function (t) {
        this.videoTexture = this.texture;
        var e = this,
          i = new Image();
        (i.onload = function () {
          (e.type = TMap3D.VIDEOTYPE.Image),
            (e.videoTexture = new Cesium.Texture({ context: e.viewer.scene.context, source: i }));
        }),
          (i.onerror = function (e) {
            console.warn('图片加载失败：' + t + e);
          }),
          (i.src = t);
      }),
      (t.prototype.activeColor = function (e) {
        var t, i, o;
        (this.type = TMap3D.VIDEOTYPE.Color),
          (e = e
            ? ((t = 255 * e.red), (i = 255 * e.green), (o = 255 * e.blue), 255 * e.alpha)
            : ((t = 255 * Math.random()), (i = 255 * Math.random()), (o = 255 * Math.random()), 255 * Math.random())),
          (this.videoTexture = new Cesium.Texture({
            context: this.viewer.scene.context,
            source: { width: 1, height: 1, arrayBufferView: new Uint8Array([t, i, o, e]) },
            flipY: !1,
          }));
      }),
      (t.prototype.activeText = function (e, t) {
        (this.type = TMap3D.VIDEOTYPE.Color),
          e &&
            (((t = t || {}).textBaseline = 'top'),
            (this.textCanvas = Cesium.writeTextToCanvas(e, t)),
            (this.videoTexture = new Cesium.Texture({
              context: this.viewer.scene.context,
              source: this.textCanvas,
              flipY: !0,
            })));
      }),
      (t.prototype.locate = function () {
        var e = Cesium.clone(this.cameraPosition),
          t = Cesium.clone(this.position);
        if (((this.viewer.camera.position = e), this._dirObj))
          return (
            (this.viewer.camera.direction = Cesium.clone(this._dirObj.direction)),
            (this.viewer.camera.right = Cesium.clone(this._dirObj.right)),
            void (this.viewer.camera.up = Cesium.clone(this._dirObj.up))
          );
        (this.viewer.camera.direction = Cesium.Cartesian3.subtract(t, e, new Cesium.Cartesian3(0, 0, 0))),
          (this.viewer.camera.up = Cesium.Cartesian3.normalize(e, new Cesium.Cartesian3(0, 0, 0)));
      }),
      (t.prototype._getOrientation = function () {
        var e = this.cameraPosition,
          t = this.position,
          i = Cesium.Cartesian3.normalize(
            Cesium.Cartesian3.subtract(t, e, new Cesium.Cartesian3()),
            new Cesium.Cartesian3(),
          ),
          o = Cesium.Cartesian3.normalize(e, new Cesium.Cartesian3()),
          n = new Cesium.Camera(this.viewer.scene);
        (n.position = e), (n.direction = i), (n.up = o);
        var i = n.directionWC,
          o = n.upWC,
          r = n.rightWC,
          t = new Cesium.Cartesian3(),
          e = new Cesium.Matrix3(),
          n = new Cesium.Quaternion(),
          r = Cesium.Cartesian3.negate(r, t),
          e = e;
        Cesium.Matrix3.setColumn(e, 0, r, e),
          Cesium.Matrix3.setColumn(e, 1, o, e),
          Cesium.Matrix3.setColumn(e, 2, i, e);
        n = Cesium.Quaternion.fromRotationMatrix(e, n);
        return (this.orientation = n);
      }),
      (t.prototype._createVideoEle = function (e) {
        var t = document.createElement('SOURCE');
        (t.type = 'video/mp4'), (t.src = e);
        var i = document.createElement('SOURCE');
        (i.type = 'video/quicktime'), (i.src = e);
        e = document.createElement('video');
        return (
          e.setAttribute('autoplay', !0),
          e.setAttribute('loop', !0),
          e.setAttribute('crossorigin', !0),
          e.appendChild(t),
          e.appendChild(i),
          (e.style.display = 'none'),
          document.body.appendChild(e),
          e
        );
      }),
      (t.prototype._getWinWidHei = function () {
        var e = this.viewer.scene;
        return e.canvas.clientWidth / e.canvas.clientHeight;
      }),
      (t.prototype._createShadowMap = function (e) {
        var t = this.cameraPosition,
          i = this.position,
          o = this.viewer.scene,
          n = new Cesium.Camera(o);
        (n.position = t),
          this._dirObj && !e
            ? ((n.direction = this._dirObj.direction), (n.right = this._dirObj.right), (n.up = this._dirObj.up))
            : ((n.direction = Cesium.Cartesian3.subtract(i, t, new Cesium.Cartesian3(0, 0, 0))),
              (n.up = Cesium.Cartesian3.normalize(t, new Cesium.Cartesian3(0, 0, 0))));
        t = Cesium.Cartesian3.distance(i, t);
        (this.viewDis = t),
          (n.frustum = new Cesium.PerspectiveFrustum({
            fov: this.fov,
            aspectRatio: this.aspectRatio,
            near: 0.1,
            far: 2 * t,
          })),
          (this.viewShadowMap = new Cesium.ShadowMap({
            lightCamera: n,
            enable: !1,
            isPointLight: !1,
            isSpotLight: !0,
            cascadesEnabled: !1,
            context: o.context,
            pointLightRadius: t,
          }));
      }),
      (t.prototype._addCameraFrustum = function () {
        (this.cameraFrustum = new Cesium.Primitive({
          geometryInstances: new Cesium.GeometryInstance({
            geometry: new Cesium.FrustumOutlineGeometry({
              origin: this.cameraPosition,
              orientation: this.orientation,
              frustum: this.viewShadowMap._lightCamera.frustum,
              _drawNearPlane: !0,
            }),
            attributes: { color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(0, 0.5, 0.5)) },
          }),
          appearance: new Cesium.PerInstanceColorAppearance({ translucent: !1, flat: !0 }),
          asynchronous: !1,
          show: this.showFrustum && this.show,
        })),
          this.viewer.scene.primitives.add(this.cameraFrustum);
      }),
      (t.prototype._addPostProcess = function () {
        var t = this,
          i = t.viewShadowMap._isPointLight ? t.viewShadowMap._pointBias : t.viewShadowMap._primitiveBias;
        this.show &&
          ((this.postProcess = new Cesium.PostProcessStage({
            fragmentShader: e.default,
            uniforms: {
              mixNum: function () {
                return t.alpha;
              },
              marsShadow: function () {
                return t.viewShadowMap._shadowMapTexture;
              },
              videoTexture: function () {
                return t.videoTexture;
              },
              _shadowMap_matrix: function () {
                return t.viewShadowMap._shadowMapMatrix;
              },
              shadowMap_lightPositionEC: function () {
                return t.viewShadowMap._lightPositionEC;
              },
              shadowMap_texelSizeDepthBiasAndNormalShadingSmooth: function () {
                var e = new Cesium.Cartesian2();
                return (
                  (e.x = 1 / t.viewShadowMap._textureSize.x),
                  (e.y = 1 / t.viewShadowMap._textureSize.y),
                  Cesium.Cartesian4.fromElements(e.x, e.y, i.depthBias, i.normalShadingSmooth, this.combinedUniforms1)
                );
              },
              shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness: function () {
                return Cesium.Cartesian4.fromElements(
                  i.normalOffsetScale,
                  t.viewShadowMap._distance,
                  t.viewShadowMap.maximumDistance,
                  t.viewShadowMap._darkness,
                  this.combinedUniforms2,
                );
              },
              disViewColor: function () {
                return t._disViewColor;
              },
              clearBlack: function () {
                return t.clearBlack;
              },
            },
          })),
          this.viewer.scene.postProcessStages.add(this.postProcess));
      }),
      (t.prototype.update = function (e) {
        this.viewShadowMap && e.shadowMaps.push(this.viewShadowMap);
      }),
      (t.prototype.destroy = function () {
        if ((this.viewer.scene.primitives.remove(this), this.viewer))
          for (var e in (this.viewer.scene.postProcessStages.remove(this.postProcess),
          this.viewer.scene.primitives.remove(this.cameraFrustum),
          this.videoElement && this.videoElement.parentNode.removeChild(this.videoElement),
          this.deActiveVideo(),
          this))
            delete this[e];
      });
  })(),
  (function () {
    function n(e, t) {
      var i;
      void 0 !== window.WebGLRenderingContext && (i = [Cesium.WebGLConstants.BACK]),
        t !== e._currentFramebuffer &&
          ((e._currentFramebuffer = t),
          (i = i),
          Cesium.defined(t)
            ? (t._bind(),
              (function (e) {
                if (e.validateFramebuffer) {
                  var t,
                    i = e._gl,
                    e = i.checkFramebufferStatus(x.FRAMEBUFFER);
                  if (e !== i.FRAMEBUFFER_COMPLETE) {
                    switch (e) {
                      case i.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                        t =
                          'Framebuffer is not complete.  Incomplete attachment: at least one attachment point with a renderbuffer or texture attached has its attached object no longer in existence or has an attached image with a width or height of zero, or the color attachment point has a non-color-renderable image attached, or the depth attachment point has a non-depth-renderable image attached, or the stencil attachment point has a non-stencil-renderable image attached.  Color-renderable formats include GL_RGBA4, GL_RGB5_A1, and GL_RGB565. GL_DEPTH_COMPONENT16 is the only depth-renderable format. GL_STENCIL_INDEX8 is the only stencil-renderable format.';
                        break;
                      case i.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                        t =
                          'Framebuffer is not complete.  Incomplete dimensions: not all attached images have the same width and height.';
                        break;
                      case i.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                        t =
                          'Framebuffer is not complete.  Missing attachment: no images are attached to the framebuffer.';
                        break;
                      case i.FRAMEBUFFER_UNSUPPORTED:
                        t =
                          'Framebuffer is not complete.  Unsupported: the combination of internal formats of the attached images violates an implementation-dependent set of restrictions.';
                    }
                    throw new DeveloperError(t);
                  }
                }
              })(e),
              (i = t._getActiveColorAttachments()))
            : (t = e._gl).bindFramebuffer(t.FRAMEBUFFER, null),
          e.drawBuffers && e.glDrawBuffers(i));
    }
    var e = (TMap3D.Application.FeFlatten = function (e) {
      (e = e || {}),
        (this.viewer = Cesium.defaultValue(e.viewer, null)),
        (this.tiles = Cesium.defaultValue(e.tiles, null)),
        this.tiles &&
          this.viewer &&
          (this.viewer.scene.primitives.add(this),
          (this.flattenHeight = Cesium.defaultValue(e.flattenHeight, 0)),
          (this.flattenMode = Cesium.defaultValue(e.flattenMode, !0)),
          (this.tool = null),
          (this.hasAddEvent = !1),
          (this.b_isFlatten = !0),
          (this.textureBounds = null),
          (this.textureBoundsFloat32Array = null),
          (this.baseHeightArrayFloat32Array = null),
          (this.textureBoundsTexture = null),
          (this.baseHeightTexture = null),
          (this.offscreenTextureWidth = 4096),
          (this.offscreenTextureHeight = 4096),
          (this.flattenPlanes = []),
          (this.hasRenderDrawcommandNumber = 0),
          (this._offscreenTexture = null),
          (this._offscreenFrambuffer = null),
          (this._textureBoundsTextureDirty = !1),
          (this._baseHeightArrayTextureDirty = !1),
          (this.default_u_polygonsBoundsTexture = null),
          this.buildUniform());
    });
    Object.defineProperty(e.prototype, 'offscreenFrambuffer', {
      get: function () {
        return this._offscreenFrambuffer || this.createOffscreenFrambuffer(), this._offscreenFrambuffer;
      },
      set: function (e) {
        this._offscreenFrambuffer = e;
      },
      enumerable: !1,
      configurable: !0,
    }),
      (e.prototype.addFlattenPlane = function (e, t, i) {
        this.flattenPlanes.push({ points: [].concat(e), primitive: t, baseHight: i });
      }),
      (e.prototype.createOffscreenFrambuffer = function () {
        var e = this.viewer.scene.context;
        return 0 == this.offscreenTextureWidth || 0 == this.offscreenTextureHeight
          ? [null, null]
          : (this._offscreenTexture ||
              (this._offscreenTexture = new Cesium.Texture({
                context: e,
                width: this.offscreenTextureWidth,
                height: this.offscreenTextureHeight,
                flipY: !1,
                pixelFormat: Cesium.PixelFormat.RGBA,
              })),
            (this._offscreenFrambuffer = new Cesium.Framebuffer({
              context: e,
              colorTextures: [this._offscreenTexture],
              depthRenderbuffer: new Cesium.Renderbuffer({
                context: e,
                format: Cesium.RenderbufferFormat.DEPTH_COMPONENT16,
                width: this.offscreenTextureWidth,
                height: this.offscreenTextureHeight,
              }),
            })),
            this._offscreenFrambuffer);
      }),
      (e.prototype.update = function (i) {
        var o, n, r;
        this.drawQuad &&
          ((n = []),
          (r = []),
          (o = this).clearOffsceenFramebuffer(),
          this.flattenPlanes.forEach(function (e, t) {
            var t = e.primitive.modifyUpdate(i, o.flattenPlanes.length, t),
              t = o.recBoundsToLocalCoorBounds(t);
            (n = n.concat([t.x, t.y, t.z, t.w])),
              (e = Cesium.Matrix4.multiplyByPoint(
                o.tiles.inverseTransform,
                Cesium.Cartesian3.fromDegrees(e.baseHight[0], e.baseHight[1], e.baseHight[2]),
                new Cesium.Cartesian3(),
              ).z),
              (r = r.concat([e, 0, 0, 0]));
          }),
          (!o.textureBoundsFloat32Array || o.textureBoundsFloat32Array.length < n.length) &&
            ((o.textureBoundsFloat32Array = new Float32Array(n.length)), (o._textureBoundsTextureDirty = !0)),
          (!o.baseHeightArrayFloat32Array || o.baseHeightArrayFloat32Array.length < r.length) &&
            ((o.baseHeightArrayFloat32Array = new Float32Array(r.length)), (o._baseHeightArrayTextureDirty = !0)),
          n.forEach(function (e, t) {
            o.textureBoundsFloat32Array[t] = e;
          }),
          r.forEach(function (e, t) {
            o.baseHeightArrayFloat32Array[t] = e;
          }),
          this.changeDrawQuad());
      }),
      (e.prototype.renderOffscreenTextureTo2DCanvas = function () {
        var e = this.viewer.scene.context;
        n(e, this.offscreenFrambuffer);
        var t = document.getElementById('webgl');
        (t.width = 512), (t.clientWidth = 512), (t.height = 512), (t.clientHeight = 512);
        var i = t.getContext('2d'),
          o = new ArrayBuffer(1048576),
          t = new Uint8Array(o, 0),
          o = new Uint8ClampedArray(o, 0);
        e._gl.readPixels(0, 0, 512, 512, e._gl.RGBA, e._gl.UNSIGNED_BYTE, t), (t.length < o.length ? t : o).length;
        o = new ImageData(o, 512, 512);
        i.putImageData(o, 0, 0), n(e, null);
      }),
      (e.prototype.modifPrimitiveUpdate = function (d, e, t) {
        this.clearOffsceenFramebuffer(), this.addFlattenPlane(e, d, t);
        var m = this.viewer,
          f = this.viewer.scene.context,
          y = this,
          v = null,
          i = d.update;
        (d.points = [].concat(e)),
          (d.spayUpdate = function (e) {
            return i.call(this, e), e.commandList.pop();
          }),
          (d.update = function (e) {}),
          (d.modifyUpdate = function (e, t, i) {
            var o,
              n,
              r,
              s,
              a = Cesium.Camera.clone(m.scene.camera);
            v ||
              (m.camera.setView({
                destination:
                  ((u = d.points),
                  (c = [].concat(u)),
                  (o = c[0][0]),
                  (n = c[0][1]),
                  (r = c[0][0]),
                  (s = c[0][1]),
                  c.forEach(function (e, t) {
                    e[0] > r && (r = e[0]), e[0] < o && (o = e[0]), e[1] > s && (s = e[1]), e[1] < n && (n = e[1]);
                  }),
                  Cesium.Rectangle.fromDegrees(o, n, r, s)),
              }),
              (v = Cesium.Camera.clone(m.scene.camera))),
              (m.scene.camera = v),
              (e.camera = v),
              f._us.update(e);
            var l =
                ((p = m.scene.camera.computeViewRectangle()),
                {
                  west: Cesium.Math.toDegrees(p.west),
                  south: Cesium.Math.toDegrees(p.south),
                  east: Cesium.Math.toDegrees(p.east),
                  north: Cesium.Math.toDegrees(p.north),
                }),
              h = this.spayUpdate(e);
            h.framebuffer = y.offscreenFrambuffer;
            var u = Math.pow(4, Math.ceil(Math.log(t) / Math.log(4))),
              c = Math.sqrt(u),
              p = y.offscreenTextureWidth / Math.sqrt(u),
              t = y.offscreenTextureHeight / Math.sqrt(u),
              u = (i % c) * p,
              c = parseInt(i / c) * t,
              t = new Cesium.BoundingRectangle(u, c, p, t),
              t = new Cesium.RenderState({ viewport: t });
            return (h._renderState = t), h.execute(f), (m.scene.camera = a), (e.camera = a), f._us.update(e), l;
          });
      }),
      (e.prototype.addPlotFlatten = function (e) {
        var n, t, i, o;
        this.b_isFlatten &&
          ((n = [].concat(e.coordinates[0])),
          (t = n[0][2]),
          (i = n[0]),
          n.forEach(function (e) {
            e[2] < t && (i = e);
          }),
          (this.polyBoundsPrimitive = (function (e) {
            if (e) {
              var t = Cesium.PolygonGeometry.fromPositions({
                  positions: TMap3D.Utils.MapUtils.llhsToWorldXYZs(n),
                  height: 0,
                  vertexFormat: Cesium.VertexFormat.POSITION_ONLY,
                }),
                i = new Cesium.GeometryInstance({
                  geometry: t,
                  id: 'drawPolygonWithPrimitive',
                  attributes: { color: Cesium.ColorGeometryInstanceAttribute.fromColor(new Cesium.Color(1, 0, 0, 0)) },
                }),
                o = new Cesium.PerInstanceColorAppearance({
                  flat: !0,
                  translucent: !1,
                  vertexShaderSource:
                    'attribute vec3 position3DHigh;  attribute vec3 position3DLow;  attribute vec4 color;  attribute float batchId;  varying vec4 v_color;  void main()  {       vec4 p = czm_computePosition();      v_color = color;      gl_Position = czm_modelViewProjectionRelativeToEye * p;}',
                  fragmentShaderSource: 'varying vec4 v_color; void main(){  gl_FragColor = v_color;}',
                }),
                t = {
                  isTranslucent: function () {
                    return !1;
                  },
                  update: function () {},
                  _uniforms: {},
                };
              o.material = t;
              o = new Cesium.Primitive({ geometryInstances: i, allowPicking: !1, appearance: o, asynchronous: !1 });
              return e.scene.primitives.add(o);
            }
          })(this.viewer)),
          ((this.polyBoundsPrimitive.flatten = this).polyBoundsPrimitive.drawQuad = !1),
          ((o = this).changeDrawQuad = function () {
            o.drawQuad = !o.drawQuad;
          }),
          this.modifPrimitiveUpdate(this.polyBoundsPrimitive, n, i),
          this.changeDrawQuad());
      }),
      (e.prototype.recBoundsToLocalCoorBounds = function (e) {
        var t;
        if (!e) return new Cesium.Cartesian4(0, 0, 0, 0);
        var i,
          o = (t = this.tiles)._root.transform;
        this.tiles.isBoundingSphere &&
          ((i = t._root.boundingSphere.center), (o = Cesium.Transforms.eastNorthUpToFixedFrame(i))),
          t.inverseTransform || (t.inverseTransform = Cesium.Matrix4.clone(Cesium.Matrix4.IDENTITY)),
          t.inverseToEarthRotaionMat3 || (t.inverseToEarthRotaionMat3 = Cesium.Matrix3.clone(Cesium.Matrix3.IDENTITY)),
          t.toEarthTransformMat4 || (t.toEarthTransformMat4 = Cesium.Matrix4.clone(Cesium.Matrix4.IDENTITY)),
          (t.toEarthTransformMat4 = Cesium.Matrix4.clone(o)),
          Cesium.Matrix4.inverse(o, t.inverseTransform),
          Cesium.Matrix4.getMatrix3(t.toEarthTransformMat4, t.inverseToEarthRotaionMat3),
          Cesium.Matrix3.inverse(t.inverseToEarthRotaionMat3, t.inverseToEarthRotaionMat3);
        (o = Cesium.Cartesian3.fromDegrees(e.west, e.north)),
          (e = Cesium.Cartesian3.fromDegrees(e.east, e.south)),
          (o = Cesium.Matrix4.multiplyByPoint(t.inverseTransform, o, new Cesium.Cartesian3())),
          (e = Cesium.Matrix4.multiplyByPoint(t.inverseTransform, e, new Cesium.Cartesian3()));
        return new Cesium.Cartesian4(o.x, e.y, e.x, o.y);
      }),
      (e.prototype.buildUniform = function () {
        var e = this.tiles,
          i = this;
        (e.polygonTexture = function () {
          return i._offscreenTexture || i.viewer.scene.context.defaultTexture;
        }),
          (e.flattenHeight = function () {
            if (isNaN(i.flattenHeight)) return 0;
            if (i.tiles.isBoundingSphere) return i.flattenHeight;
            var e = Cesium.Matrix4.getTranslation(i.tiles.modelMatrix, new Cesium.Cartesian3()),
              e = Cesium.Cartesian3.negate(e, new Cesium.Cartesian3()),
              t = Cesium.Cartesian3.subtract(i.tiles.boundingSphere.center, e, new Cesium.Cartesian3()),
              e = TMap3D.Utils.MapUtils.cartesian3ToDegreesHeight(t)[2],
              t = TMap3D.Utils.MapUtils.cartesian3ToDegreesHeight(i.tiles.boundingSphere.center)[2];
            return i.flattenHeight - (e - t);
          }),
          (e.flattenMode = function () {
            return i.flattenMode;
          }),
          (e.bFlatten = function () {
            return !!(i.b_isFlatten && i.textureBoundsTexture && i._offscreenTexture);
          }),
          (e.flattenPlaneNumber = function () {
            return i.flattenPlanes.length;
          }),
          (e.toEarthInverseTransform = function () {
            return e.inverseToEarthRotaionMat3 || Cesium.Matrix3.IDENTITY;
          }),
          (e.toEarthTransform = function () {
            return e.toEarthTransformMat4 || Cesium.Matrix4.IDENTITY;
          }),
          (e.polygonsBoundsTexture = function () {
            return i.b_isFlatten && i.textureBoundsFloat32Array
              ? ((i.textureBoundsTexture && !i._textureBoundsTextureDirty) ||
                  (i.textureBoundsTexture && i.textureBoundsTexture.destroy(),
                  (i.textureBoundsTexture = new Cesium.Texture({
                    context: i.viewer.scene.context,
                    source: {
                      width: 1,
                      height: i.textureBoundsFloat32Array.length / 4,
                      windFieldBuffer: i.textureBoundsFloat32Array,
                    },
                    pixelFormat: Cesium.PixelFormat.RGBA,
                    pixelDatatype: Cesium.PixelDatatype.FLOAT,
                    flipY: !1,
                  })),
                  (i._textureBoundsTextureDirty = !1)),
                i.textureBoundsTexture)
              : (i.default_u_polygonsBoundsTexture ||
                  (i.default_u_polygonsBoundsTexture = new Cesium.Texture({
                    context: i.viewer.scene.context,
                    source: { width: 1, height: 1, arrayBufferView: new Float32Array([0, 0, 0, 0]) },
                    pixelFormat: Cesium.PixelFormat.RGBA,
                    pixelDatatype: Cesium.PixelDatatype.FLOAT,
                    flipY: !0,
                  })),
                i.default_u_polygonsBoundsTexture);
          }),
          (e.baseHeightArrayTexture = function () {
            return i.b_isFlatten && i.baseHeightArrayFloat32Array
              ? ((i.baseHeightTexture && !i._baseHeightArrayTextureDirty) ||
                  (i.baseHeightTexture && i.baseHeightTexture.destroy(),
                  (i.baseHeightTexture = new Cesium.Texture({
                    context: i.viewer.scene.context,
                    source: {
                      width: 1,
                      height: i.baseHeightArrayFloat32Array.length / 4,
                      windFieldBuffer: i.baseHeightArrayFloat32Array,
                    },
                    pixelFormat: Cesium.PixelFormat.RGBA,
                    pixelDatatype: Cesium.PixelDatatype.FLOAT,
                    flipY: !1,
                  })),
                  (i._baseHeightArrayTextureDirty = !1)),
                i.baseHeightTexture)
              : (i.default_u_polygonsBoundsTexture ||
                  (i.default_u_polygonsBoundsTexture = new Cesium.Texture({
                    context: i.viewer.scene.context,
                    source: { width: 1, height: 1, arrayBufferView: new Float32Array([0, 0, 0, 0]) },
                    pixelFormat: Cesium.PixelFormat.RGBA,
                    pixelDatatype: Cesium.PixelDatatype.FLOAT,
                    flipY: !0,
                  })),
                i.default_u_polygonsBoundsTexture);
          });
      }),
      (e.prototype.setFlattenHeight = function (e) {
        this.flattenHeight = e;
      }),
      (e.prototype.getFlattenHeight = function () {
        return this.flattenHeight;
      }),
      (e.prototype.setFlattenMode = function (e) {
        this.flattenMode = e;
      }),
      (e.prototype.getFlattenMode = function () {
        return this.flattenMode;
      }),
      (e.prototype.clearOffsceenFramebuffer = function () {
        this._clearCommand ||
          (this._clearCommand = new Cesium.ClearCommand({ color: new Cesium.Color(0, 0, 0, 1), depth: 1 })),
          (this._clearCommand.framebuffer = this.offscreenFrambuffer),
          this._clearCommand.execute(this.viewer.scene.context),
          (this._clearCommand.framebuffer = void 0);
      }),
      (e.prototype.destroy = function () {
        (this.b_isFlatten = !1), (this.flattenPlanes = []);
      });
  })(),
  (function () {
    var e = (TMap3D.Clusters.Cluster = function (e, t) {
      (t = t || {}),
        (this.id = TMap3D.BaseUtils.uuid()),
        (this.geojsonDataSource = new Cesium.GeoJsonDataSource(this.id)),
        (this.viewer = e),
        this.viewer.dataSources.add(this.geojsonDataSource),
        (this.getImageUrl = t.getImageUrl),
        (this.getClusterImageUrl = t.getClusterImageUrl),
        (this.click = t.click || function () {});
    });
    (e.prototype.addMarkers = function (e, t) {
      (t = t || {}),
        this.geojsonDataSource.load(e),
        (this.geojsonDataSource.clustering.enabled = !0),
        (this.geojsonDataSource.clustering.pixelRange = t.pixelRange || 30),
        (this.geojsonDataSource.clustering.minimumClusterSize = t.minimumClusterSize || 3),
        this.setClusterEvent(this.geojsonDataSource),
        this.geojsonDataSource.entities.values.forEach(function (e) {
          (e.billboard.image = this.getImageUrl
            ? this.getImageUrl(e)
            : TMap3D.BaseUtils.getHostPath() + '/TMap/blueCamera.png'),
            (e.type = 'cluser');
        });
    }),
      (e.prototype.setClusterEvent = function (e) {
        this.removeListener = e.clustering.clusterEvent.addEventListener(function (e, t) {
          (t.billboard.show = !0),
            (t.label.show = !1),
            (t.billboard.id = t.label.id),
            (t.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM),
            this.getClusterImageUrl && this.getClusterImageUrl instanceof Function
              ? (t.billboard.image = this.getClusterImageUrl(e.length))
              : 300 <= e.length
              ? (t.billboard.image = TMap3D.BaseUtils.getHostPath() + '/TMap/cluser/300+.png')
              : 150 <= e.length
              ? (t.billboard.image = TMap3D.BaseUtils.getHostPath() + '/TMap/cluser/150+.png')
              : 90 <= e.length
              ? (t.billboard.image = TMap3D.BaseUtils.getHostPath() + '/TMap/cluser/90+.png')
              : 30 <= e.length
              ? (t.billboard.image = TMap3D.BaseUtils.getHostPath() + '/TMap/cluser/30+.png')
              : 10 < e.length
              ? (t.billboard.image = TMap3D.BaseUtils.getHostPath() + '/TMap/cluser/10+.png')
              : (t.billboard.image = TMap3D.BaseUtils.getHostPath() + '/TMap/cluser/' + e.length + '.png');
        });
      }),
      (e.prototype.selectedEntityChanged = function () {
        var t = this;
        this.removeClickListener = this.viewer.selectedEntityChanged.addEventListener(function (e) {
          t.click(e);
        });
      }),
      (e.prototype.destroy = function () {
        this.removeListener.call(),
          this.removeClickListener.call(),
          this.viewer.dataSources.remove(this.geojsonDataSource, !0);
      });
  })(),
  (function () {
    var e = (TMap3D.Clusters.DynamicCluser = function (e, t) {
      (t = t || {}),
        (this.id = TMap3D.BaseUtils.uuid()),
        (this.cluserImages = {}),
        (this.geojsonDataSource = new Cesium.GeoJsonDataSource(this.id)),
        (this.viewer = e),
        (this.clusterColors = t.clusterColors || [
          { value: 100, color: 'rgb(255,0,0)' },
          { value: 50, color: 'rgb(255,255,0)' },
          { value: 10, color: 'rgb(51, 133, 255)' },
          { value: 1, color: 'rgb(0,255,0)' },
        ]),
        this.viewer.dataSources.add(this.geojsonDataSource),
        (this.getImageUrl = t.getImageUrl),
        (this.click = t.click || function () {});
    });
    (e.prototype.addMarkers = function (e, t) {
      (t = t || {}),
        this.geojsonDataSource.load(e),
        (this.geojsonDataSource.clustering.enabled = !0),
        (this.geojsonDataSource.clustering.pixelRange = t.pixelRange || 30),
        (this.geojsonDataSource.clustering.minimumClusterSize = t.minimumClusterSize || 3),
        this.setClusterEvent(this.geojsonDataSource),
        this.geojsonDataSource.entities.values.forEach(function (e) {
          (e.billboard.image = this.getImageUrl
            ? this.getImageUrl(e)
            : TMap3D.BaseUtils.getHostPath() + '/TMap/blueCamera.png'),
            (e.type = 'cluser');
        });
    }),
      (e.prototype.setClusterEvent = function (e) {
        var i = this;
        this.removeListener = this.geojsonDataSource.clustering.clusterEvent.addEventListener(function (e, t) {
          (t.billboard.show = !0),
            (t.label.show = !1),
            (t.billboard.id = t.label.id),
            (t.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM),
            (t.billboard.image = i.getCluserImage(e.length));
        });
      }),
      (e.prototype.getCluserImage = function (e) {
        if (this.cluserImages[e]) return this.cluserImages[e];
        var t = document.createElement('canvas'),
          i = 12 * (e + '').length + 50;
        t.width = t.height = i;
        var o = t.getContext('2d');
        o.beginPath(),
          (o.globalAlpha = 0.5),
          (o.fillStyle = this.getCluseColor(e)),
          o.arc(i / 2, i / 2, i / 2 - 5, 0, 2 * Math.PI),
          o.fill(),
          o.beginPath(),
          (o.globalAlpha = 0.8),
          (o.fillStyle = this.getCluseColor(e)),
          o.arc(i / 2, i / 2, i / 2 - 10, 0, 2 * Math.PI),
          o.fill(),
          (o.font = '20px 微软雅黑'),
          (o.globalAlpha = 1),
          (o.fillStyle = 'rgb(255,255,255)');
        var n = 12 * e.toString().length;
        return o.fillText(e, i / 2 - n / 2, i / 2 + 10), t;
      }),
      (e.prototype.getCluseColor = function (e) {
        for (var t = 0; t < this.clusterColors.length; t++) {
          var i = this.clusterColors[t];
          if (e >= i.value) return i.color;
        }
      }),
      (e.prototype.selectedEntityChanged = function (e) {
        var t = this;
        this.removeClickListener = this.viewer.selectedEntityChanged.addEventListener(function (e) {
          t.click(e);
        });
      }),
      (e.prototype.destroy = function () {
        this.removeListener.call(),
          this.removeClickListener.call(),
          this.viewer.dataSources.remove(this.geojsonDataSource, !0);
      });
  })(),
  (function () {
    var e = (TMap3D.Billboard.GifBillboard = function (e, t, i) {
      var o = this;
      (this.viewer = e), (this.position = t);
      var n = document.createElement('img');
      (n.src = i),
        (n.onload = function () {
          o.loadGif(n);
        });
    });
    (e.prototype.loadGif = function (e) {
      var t = this;
      (this.superGif = new TMap3D.GifHelper({ gif: e })),
        this.superGif.load(function () {
          t.billboardEntity = t.viewer.entities.add({
            position: t.position,
            billboard: {
              image: new Cesium.CallbackProperty(function () {
                return t.superGif.get_canvas().toDataURL('image/png');
              }, !1),
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
              scaleByDistance: new Cesium.NearFarScalar(500, 1, 2e3, 0.1),
            },
          });
        });
    }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.billboardEntity);
      });
  })(),
  (function () {
    function te(e) {
      (this.data = e),
        (this.len = this.data.length),
        (this.pos = 0),
        (this.readByte = function () {
          if (this.pos >= this.data.length) throw new Error('Attempted to read past end of stream.');
          return e instanceof Uint8Array ? e[this.pos++] : 255 & e.charCodeAt(this.pos++);
        }),
        (this.readBytes = function (e) {
          for (var t = [], i = 0; i < e; i++) t.push(this.readByte());
          return t;
        }),
        (this.read = function (e) {
          for (var t = '', i = 0; i < e; i++) t += String.fromCharCode(this.readByte());
          return t;
        }),
        (this.readUnsigned = function () {
          var e = this.readBytes(2);
          return (e[1] << 8) + e[0];
        });
    }
    function ie(n, r) {
      function t(e) {
        (e.leftPos = n.readUnsigned()),
          (e.topPos = n.readUnsigned()),
          (e.width = n.readUnsigned()),
          (e.height = n.readUnsigned());
        var t = l(n.readByte());
        (e.lctFlag = t.shift()),
          (e.interlaced = t.shift()),
          (e.sorted = t.shift()),
          (e.reserved = t.splice(0, 2)),
          (e.lctSize = a(t.splice(0, 3))),
          e.lctFlag && (e.lct = o(1 << (e.lctSize + 1))),
          (e.lzwMinCodeSize = n.readByte()),
          (t = s()),
          (e.pixels = (function (t, o) {
            for (var e, i, n = 0, r = [], s = 1 << t, a = s + 1, l = t + 1, h = []; ; )
              if (
                ((i = e),
                (e = (function (e) {
                  for (var t = 0, i = 0; i < e; i++) o.charCodeAt(n >> 3) & (1 << (7 & n)) && (t |= 1 << i), n++;
                  return t;
                })(l)) !== s)
              ) {
                if (e === a) break;
                if (e < h.length) i !== s && h.push(h[i].concat(h[e][0]));
                else {
                  if (e !== h.length) throw new Error('Invalid LZW code.');
                  h.push(h[i].concat(h[i][0]));
                }
                r.push.apply(r, h[e]), h.length === 1 << l && l < 12 && l++;
              } else
                !(function () {
                  (h = []), (l = t + 1);
                  for (var e = 0; e < s; e++) h[e] = [e];
                  (h[s] = []), (h[a] = null);
                })();
            return r;
          })(e.lzwMinCodeSize, t)),
          e.interlaced &&
            (e.pixels = (function (i, o) {
              for (
                var n = new Array(i.length), e = i.length / o, t = [0, 4, 2, 1], r = [8, 8, 4, 2], s = 0, a = 0;
                a < 4;
                a++
              )
                for (var l = t[a]; l < e; l += r[a])
                  (function (e, t) {
                    t = i.slice(t * o, (t + 1) * o);
                    n.splice.apply(n, [e * o, o].concat(t));
                  })(l, s),
                    s++;
              return n;
            })(e.pixels, e.width)),
          r.img && r.img(e);
      }
      function i() {
        var e = {};
        switch (((e.sentinel = n.readByte()), String.fromCharCode(e.sentinel))) {
          case '!':
            (e.type = 'ext'),
              (function (e) {
                switch (((e.label = n.readByte()), e.label)) {
                  case 249:
                    (e.extType = 'gce'),
                      (function (e) {
                        n.readByte();
                        var t = l(n.readByte());
                        (e.reserved = t.splice(0, 3)),
                          (e.disposalMethod = a(t.splice(0, 3))),
                          (e.userInput = t.shift()),
                          (e.transparencyGiven = t.shift()),
                          (e.delayTime = n.readUnsigned()),
                          (e.transparencyIndex = n.readByte()),
                          (e.terminator = n.readByte()),
                          r.gce && r.gce(e);
                      })(e);
                    break;
                  case 254:
                    (e.extType = 'com'), ((o = e).comment = s()), r.com && r.com(o);
                    break;
                  case 1:
                    (e.extType = 'pte'),
                      (i = e),
                      n.readByte(),
                      (i.ptHeader = n.readBytes(12)),
                      (i.ptData = s()),
                      r.pte && r.pte(i);
                    break;
                  case 255:
                    (e.extType = 'app'),
                      (t = e),
                      'NETSCAPE' === (n.readByte(), (t.identifier = n.read(8)), (t.authCode = n.read(3)), t.identifier)
                        ? ((i = t),
                          n.readByte(),
                          (i.unknown = n.readByte()),
                          (i.iterations = n.readUnsigned()),
                          (i.terminator = n.readByte()),
                          r.app && r.app.NETSCAPE && r.app.NETSCAPE(i))
                        : (((t = t).appData = s()), r.app && r.app[t.identifier] && r.app[t.identifier](t));
                    break;
                  default:
                    (e.extType = 'unknown'), ((t = e).data = s()), r.unknown && r.unknown(t);
                }
                var t, i, o;
              })(e);
            break;
          case ',':
            (e.type = 'img'), t(e);
            break;
          case ';':
            (e.type = 'eof'), r.eof && r.eof(e);
            break;
          default:
            throw new Error('Unknown block: 0x' + e.sentinel.toString(16));
        }
        'eof' !== e.type && setTimeout(i, 0);
      }
      r = r || {};
      var o = function (e) {
          for (var t = [], i = 0; i < e; i++) t.push(n.readBytes(3));
          return t;
        },
        s = function () {
          for (var e, t = ''; (e = n.readByte()), (t += n.read(e)), 0 !== e; );
          return t;
        };
      !(function () {
        var e = {};
        if (((e.sig = n.read(3)), (e.ver = n.read(3)), 'GIF' !== e.sig)) throw new Error('Not a GIF file.');
        (e.width = n.readUnsigned()), (e.height = n.readUnsigned());
        var t = l(n.readByte());
        (e.gctFlag = t.shift()),
          (e.colorRes = a(t.splice(0, 3))),
          (e.sorted = t.shift()),
          (e.gctSize = a(t.splice(0, 3))),
          (e.bgColor = n.readByte()),
          (e.pixelAspectRatio = n.readByte()),
          e.gctFlag && (e.gct = o(1 << (e.gctSize + 1))),
          r.hdr && r.hdr(e);
      })(),
        setTimeout(i, 0);
    }
    var a = function (e) {
        return e.reduce(function (e, t) {
          return 2 * e + t;
        }, 0);
      },
      l = function (e) {
        for (var t = [], i = 7; 0 <= i; i--) t.push(!!(e & (1 << i)));
        return t;
      };
    TMap3D.GifHelper = function (e) {
      var i,
        n,
        t,
        s = { vp_l: 0, vp_t: 0, vp_w: null, vp_h: null, c_w: null, c_h: null };
      for (t in e) s[t] = e[t];
      s.vp_w && s.vp_h && (s.is_vp = !0);
      var o = null,
        r = !1,
        a = null,
        l = null,
        h = null,
        u = null,
        c = null,
        p = null,
        d = null,
        m = !0,
        f = !1,
        y = [],
        v = [],
        C = s.gif;
      void 0 === s.auto_play &&
        (s.auto_play = !C.getAttribute('rel:auto_play') || '1' == C.getAttribute('rel:auto_play'));
      function g() {
        (c = h), (p = h = l = a = null);
      }
      function w() {
        try {
          ie(i, J);
        } catch (e) {
          P('parse');
        }
      }
      function E(e, t) {
        (S.width = e * q()),
          (S.height = t * q()),
          (I.style.minWidth = e * q() + 'px'),
          (L.width = e),
          (L.height = t),
          (L.style.width = e + 'px'),
          (L.style.height = t + 'px'),
          L.getContext('2d').setTransform(1, 0, 0, 1, 0, 0);
      }
      function P(e) {
        (o = e),
          (n = { width: C.width, height: C.height }),
          (y = []),
          (b.fillStyle = 'black'),
          b.fillRect(0, 0, s.c_w || n.width, s.c_h || n.height),
          (b.strokeStyle = 'red'),
          (b.lineWidth = 3),
          b.moveTo(0, 0),
          b.lineTo(s.c_w || n.width, s.c_h || n.height),
          b.moveTo(0, s.c_h || n.height),
          b.lineTo(s.c_w || n.width, 0),
          b.stroke();
      }
      function M() {
        p && (y.push({ data: p.getImageData(0, 0, n.width, n.height), delay: l }), v.push({ x: 0, y: 0 }));
      }
      function T(e) {
        Q(i.pos, i.data.length, e);
      }
      function A() {}
      function _(t, i) {
        return function (e) {
          t(e), T(i);
        };
      }
      function D() {
        var e = document.createElement('div');
        (S = document.createElement('canvas')),
          (b = S.getContext('2d')),
          (I = document.createElement('div')),
          (L = document.createElement('canvas')),
          (e.width = S.width = C.width),
          (e.height = S.height = C.height),
          (I.style.minWidth = C.width + 'px'),
          (e.className = 'jsgif'),
          (I.className = 'jsgif_toolbar'),
          e.appendChild(S),
          e.appendChild(I),
          s.c_w && s.c_h && E(s.c_w, s.c_h),
          (K = !0);
      }
      function x(e) {
        return !r && (($ = e || !1), (r = !0), (y = []), g(), !(d = p = c = u = null));
      }
      var S,
        b,
        I,
        L,
        R,
        B,
        F,
        U,
        O,
        H,
        N,
        V = s.hasOwnProperty('on_end') ? s.on_end : null,
        z = s.hasOwnProperty('loop_delay') ? s.loop_delay : 0,
        k = s.hasOwnProperty('loop_mode') ? s.loop_mode : 'auto',
        G = !s.hasOwnProperty('draw_while_loading') || s.draw_while_loading,
        W = !!G && (!s.hasOwnProperty('show_progress_bar') || s.show_progress_bar),
        Y = s.hasOwnProperty('progressbar_height') ? s.progressbar_height : 25,
        j = s.hasOwnProperty('progressbar_background_color') ? s.progressbar_background_color : 'rgba(255,255,255,0.4)',
        Z = s.hasOwnProperty('progressbar_foreground_color') ? s.progressbar_foreground_color : 'rgba(255,0,22,.8)',
        Q = function (e, t, i) {
          var o, n, r;
          i &&
            W &&
            ((i = Y),
            s.is_vp
              ? (r = f
                  ? ((n = (s.vp_t + s.vp_h - i) / q()),
                    (i /= q()),
                    (o = s.vp_l / q() + (e / t) * (s.vp_w / q())),
                    S.width / q())
                  : ((n = s.vp_t + s.vp_h - i), (o = s.vp_l + (e / t) * s.vp_w), S.width))
              : ((n = (S.height - i) / (f ? q() : 1)),
                (o = ((e / t) * S.width) / (f ? q() : 1)),
                (r = S.width / (f ? q() : 1)),
                (i /= f ? q() : 1)),
            (b.fillStyle = j),
            b.fillRect(o, n, r - o, i),
            (b.fillStyle = Z),
            b.fillRect(0, n, o, i));
        },
        X =
          ((O = 0),
          (B = function () {
            null !== V && V(C), !1 !== k || ++O < 0 ? F() : (m = R = !1);
          }),
          {
            init: function () {
              o || ((s.c_w && s.c_h) || b.scale(q(), q()), s.auto_play ? H() : ((U = 0), N()));
            },
            step: (H = function () {
              R || setTimeout(F, 0);
            }),
            play: function () {
              (m = !0), H();
            },
            pause: function () {
              m = !1;
            },
            playing: m,
            move_relative: ee,
            current_frame: function () {
              return U;
            },
            length: function () {
              return y.length;
            },
            move_to: function (e) {
              (U = e), N();
            },
          }),
        J = {
          hdr: _(function (e) {
            E((n = e).width, n.height);
          }),
          gce: _(function (e) {
            M(), g(), (a = e.transparencyGiven ? e.transparencyIndex : null), (l = e.delayTime), (h = e.disposalMethod);
          }),
          com: _(A),
          app: { NETSCAPE: _(A) },
          img: _(function (e) {
            p = p || L.getContext('2d');
            var t = y.length,
              i = e.lctFlag ? e.lct : n.gct;
            0 < t &&
              (3 === c
                ? null !== u
                  ? p.putImageData(y[u].data, 0, 0)
                  : p.clearRect(d.leftPos, d.topPos, d.width, d.height)
                : (u = t - 1),
              2 === c && p.clearRect(d.leftPos, d.topPos, d.width, d.height));
            var o = p.getImageData(e.leftPos, e.topPos, e.width, e.height);
            e.pixels.forEach(function (e, t) {
              e !== a &&
                ((o.data[4 * t + 0] = i[e][0]),
                (o.data[4 * t + 1] = i[e][1]),
                (o.data[4 * t + 2] = i[e][2]),
                (o.data[4 * t + 3] = 255));
            }),
              p.putImageData(o, e.leftPos, e.topPos),
              f || (b.scale(q(), q()), (f = !0)),
              G && (b.drawImage(L, 0, 0), (G = s.auto_play)),
              (d = e);
          }, !(R = !(U = -1))),
          eof: function (e) {
            M(),
              T(!1),
              (s.c_w && s.c_h) || ((S.width = n.width * q()), (S.height = n.height * q())),
              X.init(),
              (r = !1),
              $ && $(C);
          },
        },
        q = function () {
          return s.max_width && n && n.width > s.max_width ? s.max_width / n.width : 1;
        },
        K = !(N = function () {
          var e;
          (U = parseInt(U, 10)) > y.length - 1 && (U = 0),
            (e = v[(U = U < 0 ? 0 : U)]),
            L.getContext('2d').putImageData(y[U].data, e.x, e.y),
            (b.globalCompositeOperation = 'copy'),
            b.drawImage(L, 0, 0);
        }),
        $ = !(F = function () {
          var e;
          (R = m) &&
            (ee(1),
            (e = 10 * y[U].delay || 100),
            0 == (U + 1 + y.length) % y.length ? ((e += z), setTimeout(B, e)) : setTimeout(F, e));
        });
      function ee(e) {
        (U += e), N();
      }
      return {
        play: X.play,
        pause: X.pause,
        move_relative: X.move_relative,
        move_to: X.move_to,
        get_playing: function () {
          return m;
        },
        get_canvas: function () {
          return S;
        },
        get_canvas_scale: function () {
          return q();
        },
        get_loading: function () {
          return r;
        },
        get_auto_play: function () {
          return s.auto_play;
        },
        get_length: function () {
          return X.length();
        },
        get_current_frame: function () {
          return X.current_frame();
        },
        load_url: function (e, t) {
          x(t) &&
            ((t = new XMLHttpRequest()).open('GET', e, !0),
            'overrideMimeType' in t
              ? t.overrideMimeType('text/plain; charset=x-user-defined')
              : 'responseType' in t
              ? (t.responseType = 'arraybuffer')
              : t.setRequestHeader('Accept-Charset', 'x-user-defined'),
            (t.onloadstart = function () {
              K || D();
            }),
            (t.onload = function (e) {
              200 != this.status && P('xhr - response'),
                'response' in this ||
                  (this.response = new VBArray(this.responseText).toArray().map(String.fromCharCode).join(''));
              var t = this.response;
              0 < t.toString().indexOf('ArrayBuffer') && (t = new Uint8Array(t)), (i = new te(t)), setTimeout(w, 0);
            }),
            (t.onprogress = function (e) {
              e.lengthComputable && Q(e.loaded, e.total, !0);
            }),
            (t.onerror = function () {
              P('xhr');
            }),
            t.send());
        },
        load: function (e) {
          this.load_url(C.getAttribute('rel:animated_src') || C.src, e);
        },
        load_raw: function (e, t) {
          x(t) && (K || D(), (i = new te(e)), setTimeout(w, 0));
        },
        set_frame_offset: function (e, t) {
          v[e] ? (void 0 !== t.x && (v[e].x = t.x), void 0 !== t.y && (v[e].y = t.y)) : (v[e] = t);
        },
      };
    };
  })(),
  (function () {
    var e = (TMap3D.Billboard.AlertBillboard = function (e) {
      (this.viewer = e.viewer),
        (this.position = e.position),
        (this.color = e.color || Cesium.Color.RED),
        (this.iconUrl = e.iconUrl),
        (this.pixelSize = e.pixelSize || 10),
        (this.pixelMax = e.pixelMax || 50),
        (this.outWidth = e.outWidth || 20),
        this.createMarker();
    });
    (e.prototype.createMarker = function () {
      var e = this,
        t = 1,
        i = !0,
        o = this.pixelSize,
        n = !0,
        r = 0.7,
        s = !0,
        a = this.pixelMax;
      (this.markerEntity = this.viewer.entities.add({
        position: this.position,
        billboard: { verticalOrigin: Cesium.VerticalOrigin.BOTTOM },
      })),
        (this.markerEntity.point = {
          color: new Cesium.CallbackProperty(function () {
            return i ? (t -= 0.03) <= 0 && (i = !1) : ((t = 1), (i = !0)), e.color.withAlpha(t);
          }, !1),
          pixelSize: new Cesium.CallbackProperty(function (e, t) {
            return n ? (o += 2) >= a && (n = !1) : ((o = 10), (n = !0)), o;
          }, !1),
          outlineColor: new Cesium.CallbackProperty(function () {
            return s ? (r -= 0.035) <= 0 && (s = !1) : ((r = 0.7), (s = !0)), e.color.withAlpha(r);
          }, !1),
          outlineWidth: this.outWidth,
          scaleByDistance: new Cesium.NearFarScalar(1200, 1, 5200, 0.4),
        }),
        this.iconUrl &&
          (this.markerEntity.billboard = {
            image: this.iconUrl,
            scaleByDistance: new Cesium.NearFarScalar(1200, 1, 5200, 0.4),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e4),
          });
    }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.markerEntity), (this.markerEntity = void 0);
      });
  })(),
  (function () {
    var e = (TMap3D.InfoWindow = function (e, t, i, o) {
      (this.viewer = e),
        (this.position = t),
        (this.element = i),
        (this.options = o || {}),
        e.cesiumWidget.container.appendChild(this.element),
        this.addPostRender();
    });
    (e.prototype.addPoint = function () {
      this.viewer.entities.add({
        position: this.position,
        point: { pixelSize: 10, color: Cesium.Color.RED, verticalOrigin: Cesium.VerticalOrigin.BOTTOM },
      });
    }),
      (e.prototype.addPostRender = function () {
        this.viewer.scene.postRender.addEventListener(this.postRender, this);
      }),
      (e.prototype.postRender = function () {
        var e, t, i, o;
        this.element &&
          this.element.style &&
          ((e = this.viewer.scene.canvas.height),
          (t = new Cesium.Cartesian2()),
          Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, t),
          (i = this.options.offset || { x: 0, y: 0 }),
          'Center' === this.options.showMode
            ? ((this.element.style.bottom = e - t.y + i.y + 'px'),
              (o = this.element.offsetWidth),
              (this.element.style.left = t.x - o / 2 + i.x + 'px'))
            : ((this.element.style.bottom = e - t.y + 'px'), (this.element.style.left = t.x + 'px')));
      }),
      (e.prototype.closeWindow = function () {
        this.viewer.scene.postRender.removeEventListener(this.postRender, this), this.element.remove();
      }),
      (e.prototype.hide = function () {
        this.element.style.visibility = 'hidden';
      }),
      (e.prototype.show = function () {
        this.element.style.visibility = 'visible';
      });
  })(),
  (function () {
    var e = (TMap3D.CameraLine = function (e, t) {
      (this.viewer = e),
        (this.viewPosition = t.viewPosition),
        (this.viewPositionEnd = t.viewPositionEnd),
        (this.viewDistance = this.getDistance()),
        (this.viewHeading = this.getViewHeading()),
        (this.viewPitch = this.getViewPitch()),
        (this.horizontalViewAngle = t.horizontalViewAngle || 90),
        (this.verticalViewAngle = t.verticalViewAngle || 60),
        this.drawSketch(),
        this.drawFrustumOutline();
    });
    (e.prototype.updateEndPosition = function (e) {
      this.viewPositionEnd = e;
    }),
      (e.prototype.getViewHeading = function () {
        var e, t, i;
        return (
          (this.viewHeading =
            ((e = this.viewPosition),
            (t = this.viewPositionEnd),
            (i = new Cesium.Cartesian3()),
            (e = Cesium.Transforms.eastNorthUpToFixedFrame(e)),
            Cesium.Matrix4.inverse(e, e),
            Cesium.Matrix4.multiplyByPoint(e, t, i),
            Cesium.Cartesian3.normalize(i, i),
            Cesium.Math.toDegrees(Math.atan2(i.x, i.y)))),
          this.viewHeading
        );
      }),
      (e.prototype.getViewPitch = function () {
        var e, t, i;
        return (
          (this.viewPitch =
            ((e = this.viewPosition),
            (t = this.viewPositionEnd),
            (i = new Cesium.Cartesian3()),
            (e = Cesium.Transforms.eastNorthUpToFixedFrame(e)),
            Cesium.Matrix4.inverse(e, e),
            Cesium.Matrix4.multiplyByPoint(e, t, i),
            Cesium.Cartesian3.normalize(i, i),
            Cesium.Math.toDegrees(Math.asin(i.z)))),
          this.viewPitch
        );
      }),
      (e.prototype.getDistance = function () {
        return (
          (this.viewDistance = Cesium.Cartesian3.distance(this.viewPosition, this.viewPositionEnd)), this.viewDistance
        );
      }),
      (e.prototype.getOptions = function () {
        return {
          viewPosition: this.viewPosition,
          viewPositionEnd: this.viewPositionEnd,
          viewDistance: this.viewDistance,
          viewHeading: this.viewHeading,
          viewPitch: this.viewPitch,
          horizontalViewAngle: this.horizontalViewAngle,
          verticalViewAngle: this.verticalViewAngle,
        };
      }),
      (e.prototype.drawFrustumOutline = function () {
        var i = this;
        this.frustumOutline = this.viewer.entities.add({
          name: 'frustumOutline',
          position: this.viewPosition,
          orientation: new Cesium.CallbackProperty(function (e) {
            return Cesium.Transforms.headingPitchRollQuaternion(
              i.viewPosition,
              Cesium.HeadingPitchRoll.fromDegrees(i.getViewHeading() - i.horizontalViewAngle, i.getViewPitch(), 0),
            );
          }, !1),
          ellipsoid: {
            radii: new Cesium.CallbackProperty(function (e) {
              var t = i.getDistance();
              return new Cesium.Cartesian3(t, t, t);
            }, !1),
            innerRadii: new Cesium.Cartesian3(0.01, 0.01, 0.01),
            minimumClock: Cesium.Math.toRadians(-this.horizontalViewAngle / 2),
            maximumClock: Cesium.Math.toRadians(this.horizontalViewAngle / 2),
            minimumCone: Cesium.Math.toRadians(this.verticalViewAngle + 7.75),
            maximumCone: Cesium.Math.toRadians(180 - this.verticalViewAngle - 7.75),
            fill: !1,
            outline: !0,
            outlineColor: Cesium.Color.AQUA,
          },
        });
      }),
      (e.prototype.drawSketch = function () {
        var i = this;
        this.sketch = this.viewer.entities.add({
          name: 'sketch',
          position: this.viewPosition,
          orientation: new Cesium.CallbackProperty(function (e) {
            return Cesium.Transforms.headingPitchRollQuaternion(
              i.viewPosition,
              Cesium.HeadingPitchRoll.fromDegrees(i.getViewHeading() - i.horizontalViewAngle, i.getViewPitch(), 0),
            );
          }, !1),
          ellipsoid: {
            radii: new Cesium.CallbackProperty(function (e) {
              var t = i.getDistance();
              return new Cesium.Cartesian3(t, t, t);
            }, !1),
            minimumClock: Cesium.Math.toRadians(-this.horizontalViewAngle / 2),
            maximumClock: Cesium.Math.toRadians(this.horizontalViewAngle / 2),
            minimumCone: Cesium.Math.toRadians(this.verticalViewAngle + 7.75),
            maximumCone: Cesium.Math.toRadians(180 - this.verticalViewAngle - 7.75),
            fill: !1,
            outline: !0,
            subdivisions: 256,
            stackPartitions: 64,
            slicePartitions: 64,
            outlineColor: Cesium.Color.AQUA,
          },
        });
      }),
      (e.prototype.remove = function () {
        this.sketch && (this.viewer.entities.remove(this.sketch), (this.sketch = null)),
          this.frustumOutline && (this.viewer.entities.remove(this.frustumOutline), (this.frustumOutline = null));
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.Wall = function (e, t, i, o, n) {
      (this.viewer = e),
        (this.wallHeight = i),
        (this.wallColor = o),
        (this.duration = n),
        this.setPositions(t),
        this.createEntity();
    });
    (e.prototype.setPositions = function (e) {
      (this.positions = e || []), this.initHeights();
    }),
      (e.prototype.initHeights = function () {
        var t = this,
          i = [],
          o = [];
        this.positions.forEach(function (e) {
          e = Cesium.Cartographic.fromCartesian(e);
          i.push(e.height), o.push(e.height + t.wallHeight);
        }),
          (this.minimumHeights = i),
          (this.maximumHeights = o);
      }),
      (e.prototype.createEntity = function () {
        this.addWall(), this.addTrailWall();
      }),
      (e.prototype.addWall = function () {
        this.wallEntity = this.viewer.entities.add({
          wall: {
            positions: this.positions,
            minimumHeights: this.minimumHeights,
            maximumHeights: this.maximumHeights,
            material: new Cesium.WallTrailVerticalMaterialProperty(this.wallColor, this.duration || 1e3),
          },
        });
      }),
      (e.prototype.addTrailWall = function () {
        this.trailWallEntity = this.viewer.entities.add({
          wall: {
            positions: this.positions,
            minimumHeights: this.minimumHeights,
            maximumHeights: this.maximumHeights,
            material: new Cesium.WallGradientsMaterialProperty(this.wallColor),
          },
        });
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.wallEntity), this.viewer.entities.remove(this.railWallEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.Fence = function (e, t, i, o) {
      (this.viewer = e), (this.fenceHeight = i), (this.cesiumColor = o), this.setPositions(t), this.createEntity();
    });
    (e.prototype.setPositions = function (e) {
      (this.positions = e || []), this.initHeights();
    }),
      (e.prototype.initHeights = function () {
        var t = [];
        this.positions.forEach(function (e) {
          e = Cesium.Cartographic.fromCartesian(e);
          t.push(e.height);
        });
        for (var e = [], i = [], o = 0; o < t.length; o++) e.push(t[o] + this.fenceHeight), i.push(t[o]);
        (this.minimumHeights = t), (this.maximumHeights = e), (this.dayMaximumHeights = i);
      }),
      (e.prototype.createEntity = function () {
        this.initFence(), this.initDynamicFence();
      }),
      (e.prototype.initFence = function () {
        var t = this;
        this.fenceEntity = this.viewer.entities.add({
          wall: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.positions;
            }, !1),
            minimumHeights: new Cesium.CallbackProperty(function (e) {
              return t.minimumHeights;
            }, !1),
            maximumHeights: new Cesium.CallbackProperty(function (e) {
              return t.maximumHeights;
            }, !1),
            material: new Cesium.ImageMaterialProperty({
              image:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAz3SURBVHja7J1Jltw4DEQV9fL+d/RJ0Au7q9xuZ0mUABIA/195UVZyCARBaoDM7ACAPflgCAAwAADAAAAAAwAADAAAMAAAwAAAAAMAAAwAADAAAMAAAAADAAAMAAAwAADAAAAAAwAADAAAMAAAwAAAAAMAAAwAADAAAMAAAAADAAAMAAAwAADAAAAAAwAADAAAMAAAwAAAAAMAAAwAADAAAMAAAAADAAAMAAADAAAMAAAwAADAAAAAAwAADAAAMAAAwAAAAAMAAAwAADAAAMAAAAADAAAMAAAwAADAAAAAAwAADAAAMAAAwAAAAAMAAAwAADAAAMAAAAADAAAMAAAwAADAAAAAAwAADAAAMAAAwAAAAAMAAAwAADAAAMAAAAADAMAAAAADAAAMAAAwAADAAAAAAwAADAAAMAAAwAAAAAMAAAwAADAAAMAAAAADAAAMAAAwAADAAAAAAwAADAAAMAAAwAAAAAMAAAwAADAAAMAAAAADAAAMAAAwAAB4wOvHjx+a/Jt22HEcYvBzk32SItr365qfl+4v1NeC3xTBXyFusk+S4q6pKmPgYwCKERBsEzcQadcTDeBKcCvvSKHthCPrMTFvrzF4cR+R2MTB11wDKBxBBH9UjOpZ3OjbX7Enk2uju0khtedbAGiX6TgnfTZwFRGJJQ1gQsL9dsHYe9oX9t6IyxoqHGnfTQPQIqWrzgSvUsn47xLYzTKPkfZN2gLk8cxp55w1gv+spUa4z1G3V4RYiAE8bp3SjLo6K8m/c8IYzudIgQM9KpTRtlwzgIxR0zEhFS1NbzLq1YiN7wKs35ZwpLk01Nje7G0A2r4FdhyH9nUhDOaXAXyU61ymU5fC+YKOgxQkbuxLGMzdDEBL50AOg6Rq0lJWoZMsZG/UN9NaZwugW1pVgW4ZQodV01r3DEBt1rAqzbWlv4w3hQxiu0NAdBIWb9pkUpveHdDbDOCjgV6J1m4mum7V32kNsQ4ZgDYSqG0jVyWeiqxbkvF26bEBbLs9Y3Waa3TfCG36/RH10eSbLcCSm1M8mQXvZbU46AIfmFqq+zcZgHJMestNuZuSbG67saSOut/8i0A/Re8r/WkfVZx/9LfOI8gOAw3go3F82/eC1VYb65xr1SVXWfwhpHL1B2zEANRYsMT2qtWa+gPn14w7VdSIAXykEg5b0h55AnNXYnuzJgP4e3CrwsLQzJeszcjWrT+w/BBwfgagbOI7asxW8e4srD/waDR+qz9g3UTilwHceAqJtXmvVX/O/ZHQDyOqjQLknQFotfiUZ1RZ9SvHROJtkr8CZp8BNBaf0ik3VMDNEi5tapguGcC0Z9+etcRaanjFR1HYbaXdZo1OnUsG4La3i60/oFvt6ij2efUHdn2CT8vn6GLDTjKAyerPWX/AssVf9Dg7tu/t2TxJRFgsDOn1xAC0u5M72NL/pb7xs28zx4Ds46IBaJEmmI+d9qPzl3w0+zwDaLfznS/ak/tLShcIEW9IbheO5i6WZAZQMb3S8BwEV32Uo9q8X2dWeHwIrSVwSd/CIB1OdpS2T9ZncVXuqNhop/SZAbj8sEqNc7U+saetG32WdZJfx3F8OLyHVS0NIJjqxpOFtanoZ7+ejPPrOA7JtXPEVqHdkUV2QAmDSQ23rU+av9NdgKXBpCdXzbAyUX8g06rhdjB6zwBquKa1kBIJ1VydZNK24lVx1QDsz5/3GafQ0SZ0mmZTzmobekwz3B8mG9DtJwFFjCY/VfjPJ2cLtdtXGBMf6yi5bHEGMF/0Nkcpzz85G7MYza0/kPexjhzZFAbgEZCnqlLJtEetfvjnJCmt3sLqD+i7+gNZDcD8pnyC3NjJrNNJvfoDE0ucntcfuHcIWGQN2PaDH/tkZZR+ebg48jowApqWkTEr+WTPGQABSUBurJO/G0DmtHh5274tH0NAQq4t0i0DUOJg1eqB1uKWcWhROSNzmr3pTwJmCVZS37z1Bzr6nXlPSjZBZTkDsIt/pAL1B3qu2TmCnwWgigH8mjtXBy1Sf+DeX+9df8AuDhx7H3cDsJh7qRqaMOoPRH05Y3H9AbvYPkX1mROTMwNQhi0AUxQR7rq/p50ysU3qD7AFgOWRf1R7HjbBtmNjrWAAFUQ7dn6yvv7ArU5Tf8A/qM9H52vUMYBVE3b+orrbSSP1B1oHtu6OfV0DyDev9lj5BbTavP5A0tU6NoSmG0Cx+gM2rUXsW3dIw+UXBD5ym2oAvv1O8VIA9E4Iby8Ai+oPDDNkAE8H2rffWh3U2iwY0nZg4cPRTo5QxABUW1ZbJOJJ6w9UsdW4BSCpsn4aQNZl47xd2wR288DbbwFIEnM/DUB5RXlznCrWK4Qm2zWPD5/Pqj+Q/jagXJyc4I+Tc0pztdntqlp/oNTrwETyirxS4VMy0OoBnVB/4PoWoE+qt3l81/RHrdJJ7/oDl0S0ygAK325b6O08515gdLJPUobCIN/HkC0P7oinOHhRfdPM0GOivV6cWlsZyC7G0MKwUFwLeFHdO7CLjKDfkWDE8+bVDgGBwAZHIg3ALv2Fkk563voDpPJQwgDOJ536A4kb8HhQWfELzJ63AayZdCRUzYAsXeLTLOG62pU1h4DF3ZP6A6HKNYK/zhZg+X3a1M++UX9gjk5yvafOGcBfJz1IeFpuF8WEla/+gEX3KWLWuzzWcccA7u3z1VT922FXpzbNISCPdczLALil0x6hk0bnBlcMoPxnssBRtO+vYQOX1+xOU38gJgOwLWyyS9DLYY7fX0PUH+hjAE77N/UJni4Zu/+nmUvs2eudMuTNAKxCDBWrP5BJq2z5Ntry/WsAYZNe/6EutjHRKz4JYVCbLjT29evP1Gmgec44LLDVxhbr1B8Ya9Ngv1J+Eoz1Nr85UH+gx3HEXAOoW39g51SehKpxpjPXAPrVH8jmJLyCS2xfmelPnbzsOD60vJVdMkIR2GFCIX3889fkoJOXojMA1prpq/6XSCrtbVRUSIq2A/v9X/reI5XzDODtqHCLLWKPrglBw8ydTIaZ47ORb6fz6lOaiw2gQqH0dHv03CFG8J8NUI3PqVWoDJR9mbqxWlN/gMzOO7DvTfQfBhBXgKDgMhU4WdQfYLuWQ+x/GEBcAYI9XBhYrWvRZQtgAwmJ0rWc+gObrdZ7GMDMF0fmFBuj/kCETGxiG8jqHhqADcREv8FGPgHmLy1rIfUHhl8HFjExTwsJ6w/Yxb/OLwuC/9MARBznzP51MSAn1h/QcaSuP5BbBAnHo99zAD3qD4xlZNQfSNGnBfUHDAOY47I2uRFkZNfrD3SUnr27ppx/sveTgN4rLTTfpHstAI6dD057shmA7awytmHXrmHHYUqnk5r1B7wLgyzqLg+8Jwh6e1h/4LIS5FieaPf6A6+j7ovYfRbyvP5lA1OgIn0qrBr/Fl/cAuSfzQLPdVhBJWqj6Oq4EfMyAKX3BwUOklO38w8ipMimnJQgRwOIeXV98XnD8fSbLXwut3xmZxM7oIxKeF39Pc2ZmalRQMjlD6bg+gPaXWT3bwMquRT5gOzet1Rx92ADyBwlShpMc08BCAEyqZQGYAV1qzY/st/hQbWCplM/CPtaoDt03mR1Sl1/QJX1dq2Gu5wM4GP46uX22CkbXLHUtmbHGDdHTybiWv0BGzOAec8GWpw82VZ0CLGELctl3NKjYXwtHuMe5p42hkLrD9im9Qda9fLGIaDfq17UH4heVULrD6hvWLTGHhqA36teehwIbVRH+Oyeyi/S2iuZ+FReUirXNtt0cDDdgy8C+QZCzfoD2iPeWh5SuHwTUFV6qt4K3XFtsvaDGitcPf3dMhmACIQwDS6sP6D2a3a+j1RYhAHseqDiLpOk9QecGif/v77fpryaja0/EHIIuN+BSo76AzZ16HvVH1DazGPiS2OfGcBJAQJW/ZTBIE6yH6/6W9cf+MoANP4jiK/ZWcGetr23jL/OAM6XfMRH3lFtG2ZPrpHzENK3/sDXGYAQn/PGH8OMngIPzSpe8JnrD7w5BOQlTAdJKHXwVN3eqJ5UMzfvzW1A7ahQy9xCl99VwzhhnYrIAJJqYNVTVYv15tttt6uxxWmwmxp5EMiWi111B7ph/QF1CwZVNrobItNgBtD4w5ghqYU97xNnMQlyT1XvQNItwD1xF6pHoqTtippM4AwgXtwJ98LbbUm6bwd2Mrvu3wMwNEvPQ4ev9Dpidb4HgNb3TcOL1B8oGR6nBhA65NQfQIpDHVOY0e26ITw1gMECBL6SVXpFklzPD7GsJ7YlM7LrZwAxb55yetximQqtP3AUrT9QoZWWuDBImvoD1qj+QGzDNKHPJFmuo5v4EDC0/sDgRUKHiCwI8p4BQEKnG09I5pnM8mSJpycxACzj2v/wixXLk6JTfwADYP2YHSuaMC3bDeoM4T43gGYRgxvGSeGBVDRmDmO/tHP9gX8GABdT4aBM6LURAAAAAElFTkSuQmCC',
              transparent: !0,
              color: this.cesiumColor || Cesium.Color.RED,
            }),
          },
        });
      }),
      (e.prototype.initDynamicFence = function () {
        var i = this;
        (this.dynamicFenceEntity = this.viewer.entities.add({
          wall: {
            positions: new Cesium.CallbackProperty(function (e) {
              return i.positions;
            }, !1),
            minimumHeights: new Cesium.CallbackProperty(function (e) {
              return i.minimumHeights;
            }, !1),
            maximumHeights: new Cesium.CallbackProperty(function (e) {
              for (var t = 0; t < i.minimumHeights.length; t++)
                (i.dayMaximumHeights[t] += 0.004 * i.fenceHeight),
                  i.dayMaximumHeights[t] > i.maximumHeights[t] && (i.dayMaximumHeights[t] = i.minimumHeights[t]);
              return i.dayMaximumHeights;
            }, !1),
            material: new Cesium.ImageMaterialProperty({
              image:
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAtlSURBVHja7N1Zmts6DoZho5/a/xqzgt5Bor7JOV1J2WUNHADq/S4zWAAI/CIpDvHjx4//Pq4Tl39ha/Ir03hq/vaIOj599WByk8SCaTI1ds/4eDwevxoU8dbc5MEtffFxEc992irnTAxMxL05Vbv4/82yGPCg3QKwNSniFgX7+TfGF/9wASzyNpv7YijZ9XsVu5gUl9dGfu4BzB4EjKiG+OYPt0qVNdCcbZVq7NJM8e2Tt9xN21IA6o3ODCWXi0uczdS42otpFbTRVdRQAELCr+D39thWj0gkzoddD2+oEh+Px+NniiAM70A8fWCqafApOadf1D8SV/OqoWV7egBRPNxnHhiKYU/Q+ijk37/a4ykHfzNGP7i5zy9+sOEQQHf6fj7HkGBGngaLUQ8eNZXZWgCWKppOI4DI93rQ1nf1+4sAZM2td3ZtrxbjzG69QwGNfSZUnXImFun8/jIJGEkbJdpHL4ZURSROsqjaobi9oERLAfgl4E3Mb+T3+HIMxXXbHsjMOYAcjZZuyjnGJ+IYzdG1TyoAP9/kQNyqeXp8AIzcibjF+AUoii+HT//2ACKxg7vzLm+Cpt7aenKO8qafPsv1vPb1ADI3bFz/h7F+Ni3/9ovzlZVgKdFzjzq20T77sswBRIfw6npW8GnIBr7o4FNUba541wNI4e0ab8ehMlZTdGLy/FOnJnrxs+naqEMPoFlEY6xdPTIh5jZ+f/2JFnZNPQyq07xG5jm1Mz2AAz8ciV6KR5ok1uu2DzqRcDt6+GF8nxZTt+uWWoZx3a/xcwCxQDDH5kp6YYoGPZ3I48waQ6udPZ0rPYB7jVVfO2LCr7o/NWecm1h8RgAkPJ/WsjfuG/8/hgC3+PRWy8l9n0dz+LTTgnT3D3xn5fIvhj96AFGliFs+YfBMeZfToKJQ/McPsmvPSZwyb3+W9ZgDyD9Le/z+gchierNeg+FBLZ+unSvRRQBiSopHg/8VS2RxFKuehYp42A0/X6J3ocLi7RxAjTb+NgQmvvg0wNZ5003RyLh/bJvxGfCiA6EoVrB37LgkigUxRtn2vQD0baQ5RdHPp/NHjM0ZpM8VpShmb8U22JFX3wtALJBox6yJKW0cCxd6E3tL3z8wZ435Tmc+tsfjZ9NroGtMOXublLJ3+v0DUa5RYt+/+IhjcwBRLA1LFMUBzRx78Oh1MTf3kdynaXcDZj18e/qm4bP+9PhOHI3in69XeOPTkr4KwK8iFkcGuxpfEhfFUvrSKowJOqDQdwjAtM+ArRc11Gq4tFeARbEfNp9zoeqmCsDsD/5ThyF7Hu7rwM3nHL5Jkjf58/qvo1UP4Fz5PPlfUSxbqn0cTVMUjY53v9HE4vnvEnsfekEA4tR/yNx6BxO0TCJm2dp6cI7SF4S+iR2zhgBRrAWrHRIVtcytPBR5upRo8GG21yLcQABeGljtG7w3zsr+tJ9QjUNLieaHJToJQO3TdKN+YUWxHf9RLEpt7B13/8Chp7QcAgxu2MsRjTl2nbY7stXUnjFmJrsuHgaVck3k1aQofCjo7i8oydaeRJH4NnO54SrNIfcPTD2nf7S0fCcAMdmx1mEpO8Yv0sEfsIc9WhppO/TOHkDkSoMqPZR29sbNCn1Zf9ooefQSALPg/GFvHguG2PusB3DbnYCDnKz7ebTUWQ+l7h+Ylt9TdgPeYgNQzM2+DvcPRK0WiBILombPSRQ8FLTQeO3zkuE6xR8zQ2YoMlsA8vSTYmqqtZilzX3/QBTL7BvO+fTP868CMP7whqRng9Re4rxo0dzsjd///oGXQ4BoW0YFGy0Uzgr2jnuTVdrWHr3mAM5NvMwbdvR76nCfdlxXdcez+WKNIh83BDgTiC5X3hZvuOGn+UTm9C1SOH3u/Bt0/8Cpz4nvBCBaPLmL019/0HiXvRftnX7/wNVnHP7p6+sAxk85x4LlPsSbhiIcTZ+44hV0RfIl4zoAb79ORX/w1NIGE6FD3w4KvagA+KzW0d5aWzp3PTdymrXD3naLy9IJQOrCOBGze/U+vgQoMrgRhaIbw7KqcW/pHwGIFGXXqdlmZ9L4sffBhxt/3/bF8HsSsP8FBOcd2B7dr8ob2wpRKGVLFvCbtq+2u7FrO/3uAXS9gCBm+JZ5XXqjCzLSvdmyLB+PJElSQWz3zgFEtgyo3J3rlKBRLKBm7U9La7tC+7QOoO8FBB3eL6USaGd0ffqs7lOXl+ClpUSxswcQyYMdpZMjlkj4El286Yd9dohS9Gqi3YeCrjNfctSNrJ7/YVeMsTvmtlHepoiG9w8MbaLdS4EjbYFONmdf68b4MMV67TRog9Wg+wfGROxNfrbZDZh4UN3dn7zdopgb0rqCE+PO7p6+D3bKoaBN3Kg/HokFDbLwJ93o8HufbrEUmE8K9FY+HZwE/LVqoApOXNZe8tiqjUr5VPv+gSs9gNW+B9V8m3w/5Zz+kpcOx65Ovww2pqfy/h/I1AO4Z/e09RbR+fcPVLtZ6tbDjI67Aae3YpRItbZbRGNKFg1+TCxSfBl4vxuwlwPj7x+42laD1nlLVj6N8/m3AMzb6xP1dqI1bpRQWCv4XXSp7KE5gEicaLGoSrx1b979A73jHIu0UGq/P38FyB/wPvcP1H5zDV8ilXZPY6F2bKba8d2v7nnKqx5AFEn2/L9eeBdV0WvdCmTblPsH4vIQYKWx3766bHBBaOEDCaNEW3dX2Jjh09ZkR0LTOYC3gS4lBA2PcY0FHO1RhjGmgGPBaMcwrw4IQJRtlfuVYyrHol/xpx6XzVvWfeB3XgvAtX3u2x2r+1PIxOW595Hw/oE8+hnj3XstAGUOpMwzyzZ7zDw1Env2IMTNBTDhi+GzAMTF5r+WonPvH3icnfDbYfY93msrfmJtJbiJb7L++JSk29QUjdnJHafUOdZM0FYublP9mpQwOyK4ZRKAeucB9OkOLNc9jb1xiVpxiRyPWyJf/hKAfhcQ/D+YXe8faNAoaVfuXHmZG3uv9mJotNz6LwGI3tfYbfmHhWmP/t8yGDEm6M1FeD0BjCYrNbePv4KzHQpprjuFM6y5W7Dnsb0Z7jaxe0vVlFlOnH5jV/wVuzNm75kDGDq/G9MKcPbbL5LqQ7yJ7YI3BbV1aXv9F/PvH/jYUTjbbjdXvG21v1/bhKScGt/BqZL2xRANltZfjeOzHkDK+7inNbytrc3jG7PrrgZDhOtZD2D6PEDxhlv1rRViu14bfFwKSCzfcIsfNHQo+lvlUyIK3j/wzNittfkfrQtrsWIY/emtzhUfEwby0bqNSt0I2efop+YCYB9w0l5Oi9WTue4fSC86Fcoqtm1TdsBN+Y8QAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAAAQBAAAAQAAAEAAABAEAAABAAAAQAAAEAQAAAEAAABAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAAIAAACAIAAACAAAAgAAAIAgAAAIAAACAAAAgCAAAAgAAABAEAAABAAAAQAAAEAQAAAEAAABADAEvxvANtG/U5OQyQ2AAAAAElFTkSuQmCC',
              transparent: !0,
              color: this.cesiumColor || Cesium.Color.RED,
            }),
          },
        })),
          this.viewer.flyTo(this.fenceEntity);
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.fenceEntity), this.viewer.entities.remove(this.dynamicFenceEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.BaseAnimateWall = function (e, t, i, o, n) {
      (this.viewer = e),
        (this.wallHeight = i),
        (this.wallColor = o),
        (this.duration = n),
        this.setPositions(t),
        this.createEntity();
    });
    (e.prototype.setPositions = function (e) {
      (this.positions = e || []), this.initHeights();
    }),
      (e.prototype.initHeights = function () {
        var t = this,
          i = [],
          o = [];
        this.positions.forEach(function (e) {
          e = Cesium.Cartographic.fromCartesian(e);
          i.push(e.height), o.push(e.height + t.wallHeight);
        }),
          (this.minimumHeights = i),
          (this.maximumHeights = o);
      }),
      (e.prototype.createEntity = function () {
        this.addWall(), this.addTrailWall();
      }),
      (e.prototype.addWall = function () {
        this.wallEntity = this.viewer.entities.add({
          wall: {
            positions: this.positions,
            minimumHeights: this.minimumHeights,
            maximumHeights: this.maximumHeights,
            material: new Cesium.WallTrailVerticalMaterialProperty(this.wallColor, this.duration || 1e3),
          },
        });
      }),
      (e.prototype.addTrailWall = function () {
        this.trailWallEntity = this.viewer.entities.add({
          wall: {
            positions: this.positions,
            minimumHeights: this.minimumHeights,
            maximumHeights: this.maximumHeights,
            material: new Cesium.WallGradientsMaterialProperty(this.wallColor),
          },
        });
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.wallEntity), this.viewer.entities.remove(this.trailWallEntity);
      }),
      (e.prototype.show = function () {
        (this.wallEntity.show = !0), (this.trailWallEntity.show = !0);
      }),
      (e.prototype.hide = function () {
        (this.wallEntity.show = !1), (this.trailWallEntity.show = !1);
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.StripeAnimateWall = function (e, t, i, o, n, r) {
      (this.viewer = e),
        (this.wallHeight = i),
        (this.wallColor = o),
        (this.duration = n),
        (this.count = r),
        this.setPositions(t),
        this.createEntity();
    });
    (e.prototype.setPositions = function (e) {
      (this.positions = e || []), this.initHeights();
    }),
      (e.prototype.initHeights = function () {
        var t = this,
          i = [],
          o = [];
        this.positions.forEach(function (e) {
          e = Cesium.Cartographic.fromCartesian(e);
          i.push(e.height), o.push(e.height + t.wallHeight);
        }),
          (this.minimumHeights = i),
          (this.maximumHeights = o);
      }),
      (e.prototype.createEntity = function () {
        this.addWall();
      }),
      (e.prototype.addWall = function () {
        this.wallEntity = this.viewer.entities.add({
          wall: {
            positions: this.positions,
            minimumHeights: this.minimumHeights,
            maximumHeights: this.maximumHeights,
            material: new Cesium.WallTrailStripeVerticalMaterialProperty(
              this.wallColor,
              this.duration || 2e3,
              this.count || 2,
            ),
          },
        });
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.wallEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.CircleSpreadWall = function (e, t, i, o, n, r) {
      (this.viewer = e),
        (this.wallHeight = o),
        (this.radius = i),
        (this.speed = r || 1),
        (this.wallColor = n),
        this.init(t),
        this.createEntity();
    });
    (e.prototype.init = function (e) {
      e = Cesium.Cartographic.fromCartesian(e);
      e.height < 0 && (e.height = 0),
        (this.baseHeight = e.height),
        (this.centerDegrees = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height]),
        (this.currentRadius = this.radius),
        (this.rPositions = {});
      (e = this.generateCirclePoints([this.centerDegrees[0], this.centerDegrees[1]], this.currentRadius)),
        (e = this.pointsToPositions(e, this.centerDegrees[2]));
      (this.rPositions[this.radius] = e), this.setPositions(e);
    }),
      (e.prototype.pointsToPositions = function (e, t) {
        var i = [];
        return (
          e.map(function (e) {
            i.push(Cesium.Cartesian3.fromDegrees(e[0], e[1], t));
          }),
          i
        );
      }),
      (e.prototype.setPositions = function (e) {
        (this.positions = e || []), this.initHeights();
      }),
      (e.prototype.getPositions = function () {
        if (
          ((this.currentRadius += this.speed),
          this.currentRadius > this.radius && (this.currentRadius = 1),
          this.rPositions[this.currentRadius])
        )
          return this.rPositions[this.currentRadius];
        var e = this.generateCirclePoints([this.centerDegrees[0], this.centerDegrees[1]], this.currentRadius),
          e = this.pointsToPositions(e, this.centerDegrees[2]);
        return (this.rPositions[this.currentRadius] = e), this.rPositions[this.currentRadius];
      }),
      (e.prototype.initHeights = function () {
        (this.minimumHeights = new Array(this.positions.length).fill(this.baseHeight)),
          (this.maximumHeights = new Array(this.positions.length).fill(this.baseHeight + this.wallHeight));
      }),
      (e.prototype.createEntity = function () {
        this.addWall();
      }),
      (e.prototype.addWall = function () {
        var t = this;
        this.wallEntity = this.viewer.entities.add({
          wall: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.getPositions();
            }, !1),
            minimumHeights: this.minimumHeights,
            maximumHeights: this.maximumHeights,
            material: new Cesium.WallGradientsMaterialProperty(this.wallColor),
          },
        });
      }),
      (e.prototype.generateCirclePoints = function (e, t) {
        for (var i = [], o = 0; o <= 360; o += 2) i.push(this.getCirclePoint(e[0], e[1], o, t));
        return i;
      }),
      (e.prototype.getCirclePoint = function (e, t, i, o) {
        var n = o * Math.sin((i * Math.PI) / 180),
          o = o * Math.cos((i * Math.PI) / 180),
          i = 6356725 + (21412 * (90 - t)) / 90;
        return [
          (180 * (n / (i * Math.cos((t * Math.PI) / 180)) + (e * Math.PI) / 180)) / Math.PI,
          (180 * (o / i + (t * Math.PI) / 180)) / Math.PI,
        ];
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.wallEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.RegularSpreadWall = function (e, t, i, o, n, r) {
      (this.viewer = e),
        (this.edgeCount = t = !t || t < 3 ? 3 : t),
        (this.wallHeight = n),
        (this.radius = o),
        (this.wallColor = r),
        this.init(i),
        this.createEntity();
    });
    (e.prototype.init = function (e) {
      e = Cesium.Cartographic.fromCartesian(e);
      e.height < 0 && (e.height = 0),
        (this.baseHeight = e.height),
        (this.centerDegrees = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height]),
        (this.currentRadius = this.radius),
        (this.rPositions = {});
      (e = this.generateCirclePoints([this.centerDegrees[0], this.centerDegrees[1]], this.currentRadius)),
        (e = this.pointsToPositions(e, this.centerDegrees[2]));
      (this.rPositions[this.radius] = e), this.setPositions(e);
    }),
      (e.prototype.pointsToPositions = function (e, t) {
        var i = [];
        return (
          e.map(function (e) {
            i.push(Cesium.Cartesian3.fromDegrees(e[0], e[1], t));
          }),
          i
        );
      }),
      (e.prototype.setPositions = function (e) {
        (this.positions = e || []), this.initHeights();
      }),
      (e.prototype.getPositions = function () {
        if (
          ((this.currentRadius += 10),
          this.currentRadius > this.radius && (this.currentRadius = 1),
          this.rPositions[this.currentRadius])
        )
          return this.rPositions[this.currentRadius];
        var e = this.generateCirclePoints([this.centerDegrees[0], this.centerDegrees[1]], this.currentRadius),
          e = this.pointsToPositions(e, this.centerDegrees[2]);
        return (this.rPositions[this.currentRadius] = e), this.rPositions[this.currentRadius];
      }),
      (e.prototype.initHeights = function () {
        (this.minimumHeights = new Array(this.positions.length).fill(this.baseHeight)),
          (this.maximumHeights = new Array(this.positions.length).fill(this.baseHeight + this.wallHeight));
      }),
      (e.prototype.createEntity = function () {
        this.addWall();
      }),
      (e.prototype.addWall = function () {
        var t = this;
        this.wallEntity = this.viewer.entities.add({
          wall: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.getPositions();
            }, !1),
            minimumHeights: this.minimumHeights,
            maximumHeights: this.maximumHeights,
            material: new Cesium.WallGradientsMaterialProperty(this.wallColor),
          },
        });
      }),
      (e.prototype.generateCirclePoints = function (e, t) {
        for (var i = [], o = parseInt(360 / this.edgeCount), n = 0; n <= 360; n += o)
          i.push(this.getCirclePoint(e[0], e[1], n, t));
        return i;
      }),
      (e.prototype.getCirclePoint = function (e, t, i, o) {
        var n = o * Math.sin((i * Math.PI) / 180),
          o = o * Math.cos((i * Math.PI) / 180),
          i = 6356725 + (21412 * (90 - t)) / 90;
        return [
          (180 * (n / (i * Math.cos((t * Math.PI) / 180)) + (e * Math.PI) / 180)) / Math.PI,
          (180 * (o / i + (t * Math.PI) / 180)) / Math.PI,
        ];
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.wallEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.ConeGlow = function (e, t, i) {
      (this.viewer = e),
        (this.position = t),
        (this.options = i),
        (this.height = i.height || 300),
        (this.bottomRadius = i.bottomRadius || 30),
        (this.color = i.color || Cesium.Color.AQUA),
        this.addCone(),
        this.addBottomCircle(),
        this.addBottomRotateCircle();
    });
    (e.prototype.addCone = function () {
      var e = Cesium.Matrix4.multiplyByTranslation(
          Cesium.Transforms.eastNorthUpToFixedFrame(this.position),
          new Cesium.Cartesian3(0, 0, 0.5 * this.height),
          new Cesium.Matrix4(),
        ),
        t = new Cesium.CylinderGeometry({
          length: this.height,
          topRadius: 0,
          bottomRadius: 0.7 * this.bottomRadius,
          vertexFormat: Cesium.MaterialAppearance.MaterialSupport.TEXTURED.vertexFormat,
        }),
        e = new Cesium.GeometryInstance({ geometry: t, modelMatrix: e });
      (this.cylinderPrimitive = this.viewer.scene.primitives.add(
        new Cesium.Primitive({
          geometryInstances: [e],
          appearance: new Cesium.MaterialAppearance({
            material: new Cesium.Material({
              fabric: {
                type: 'VtxfShader1',
                uniforms: { color: this.color, alpha: 2 },
                source:
                  '\n                                uniform vec4 color;   \n                                czm_material czm_getMaterial(czm_materialInput materialInput)\n                                {\n                                    czm_material material = czm_getDefaultMaterial(materialInput);\n                                    vec2 st = materialInput.st;\n                                    float dis = distance(st, vec2(0.5)); \n                                    material.diffuse =2.9 * color.rgb;\n                                    material.alpha = color.a * dis * alpha ;\n                                    return material;\n                                }\n                            ',
              },
              translucent: !1,
            }),
            faceForward: !1,
            closed: !0,
          }),
        }),
      )),
        this.viewer.scene.preUpdate.addEventListener(this.preUpdateHandle, this);
    }),
      (e.prototype.preUpdateHandle = function () {
        (this.cylinderPrimitive.appearance.material.uniforms.alpha += 0.05),
          2.5 < this.cylinderPrimitive.appearance.material.uniforms.alpha &&
            (this.cylinderPrimitive.appearance.material.uniforms.alpha = 2);
      }),
      (e.prototype.addBottomCircle = function () {
        this.bottomCircle = this.viewer.entities.add({
          position: this.position,
          ellipse: {
            semiMinorAxis: 2 * this.bottomRadius,
            semiMajorAxis: 2 * this.bottomRadius,
            height: 0,
            material: new Cesium.ConeGlowBottomCircleMaterialProperty(this.color),
          },
        });
      }),
      (e.prototype.addBottomRotateCircle = function () {
        var t = 360;
        this.bottomRotateCircle = this.viewer.entities.add({
          position: this.position,
          ellipse: {
            semiMinorAxis: 1.45 * this.bottomRadius,
            semiMajorAxis: 1.45 * this.bottomRadius,
            height: 0,
            material: new Cesium.ConeGlowBottomRotateCircleMaterialProperty(this.color),
            stRotation: new Cesium.CallbackProperty(function (e) {
              return --t < 0 && (t = 360), Cesium.Math.toRadians(t);
            }, !1),
          },
        });
      }),
      (e.prototype.remove = function () {
        this.viewer.scene.preUpdate.removeEventListener(this.preUpdateHandle, this),
          this.viewer.entities.remove(this.bottomRotateCircle),
          this.viewer.entities.remove(this.bottomCircle),
          this.viewer.scene.primitives.remove(this.cylinderPrimitive);
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.ScanCircle = function (e, t, i) {
      (this.viewer = e),
        (this.position = t),
        (this.radius = (i = i || {}).radius || 10),
        (this.color = i.color || Cesium.Color.AQUA),
        this.addCircle();
    });
    (e.prototype.addCircle = function () {
      var t = 360;
      this.bottomRotateCircle = this.viewer.entities.add({
        position: this.position,
        ellipse: {
          semiMinorAxis: this.radius,
          semiMajorAxis: this.radius,
          material: new Cesium.ScanCircleMaterialProperty(this.color),
          classificationType: Cesium.ClassificationType.BOTH,
          stRotation: new Cesium.CallbackProperty(function (e) {
            return --t < 0 && (t = 360), Cesium.Math.toRadians(t);
          }, !1),
        },
      });
    }),
      (e.prototype.remove = function () {
        this.viewer.remove(this.circle);
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.HexagonSpreadScan = function (e, t, i, o) {
      (this.viewer = e), (this.position = t), (this.maxRadius = i), (this.color = o), this.createEntity();
    });
    (e.prototype.createEntity = function () {
      var t = this,
        i = 0.1;
      this.ellipseEntity = this.viewer.entities.add({
        position: this.position,
        ellipse: {
          semiMinorAxis: new Cesium.CallbackProperty(function (e) {
            return (i = (i += 8) > t.maxRadius ? 0.1 : i);
          }, !1),
          semiMajorAxis: new Cesium.CallbackProperty(function (e) {
            return i;
          }, !1),
          material: new Cesium.HexagonSpreadScanMaterialProperty(this.color),
        },
      });
    }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.ellipseEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.CircleSpreadScan = function (e, t, i, o, n) {
      (this.viewer = e),
        (this.position = t),
        (this.maxRadius = i),
        (this.color = o),
        (this.imageURL = n),
        this.createEntity();
    });
    (e.prototype.createEntity = function () {
      var t = this,
        i = 0.1;
      this.ellipseEntity = this.viewer.entities.add({
        position: this.position,
        ellipse: {
          semiMinorAxis: new Cesium.CallbackProperty(function (e) {
            return (i = (i += 4) > t.maxRadius ? 0.1 : i);
          }, !1),
          semiMajorAxis: new Cesium.CallbackProperty(function (e) {
            return i;
          }, !1),
          material: new Cesium.CircleSpreadScanMaterialProperty(this.color, this.imageURL),
        },
      });
    }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.ellipseEntity);
      });
  })(),
  (function () {
    function u(e, t) {
      var i,
        o = document.createElement('div');
      for (i in (t && t.append(o), e)) 'number' != typeof e[i] ? (o.style[i] = e[i]) : (o.style[i] = e[i] + 'px');
      return o;
    }
    var e = (TMap3D.Effects.TilesHeatMap = function (e) {
      var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : { autoMaxMin: !0, data: [] },
        i = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : [-180, -90, 180, 90],
        o = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : {},
        n = this,
        r =
          4 < arguments.length && void 0 !== arguments[4]
            ? arguments[4]
            : { enabled: !0, min: 6375e3, max: 1e7, maxRadius: 40, minRadius: 10 },
        s = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : { totalArea: 1036800, autoResize: !0 };
      if ('undefined' != typeof window) {
        (this.viewer = e), (this.bbox = i), (this.autoRadiusConfig = r), (this.max = void 0), (this.min = void 0);
        var a = i.slice(0, 4),
          l = a[0],
          h = a[1],
          i = a[2],
          a = a[3],
          h = a - h,
          i = i - l;
        if (((this.boxMeta = { top: a, left: l, height: h, width: i }), s.autoResize)) {
          if (!s.totalArea) throw 'specify totalArea if auto resize';
          (l = Math.floor(Math.sqrt(h * s.totalArea))), (h = Math.floor((l * i) / h));
          this.canvasConfig = TMap3D.BaseUtils.extend({}, s, { width: h, height: l });
        } else {
          if (!s.width || !s.height) throw 'specify width and height if not auto resize';
          this.canvasConfig = s;
        }
        o = TMap3D.BaseUtils.extend({}, o);
        o.container ||
          ((this.mountPoint = u(
            { position: 'absolute', top: 0, left: 0, 'z-index': -100, overflow: 'hidden', width: 0, height: 0 },
            document.body,
          )),
          (o.container = u({ width: this.canvasConfig.width, height: this.canvasConfig.height }, this.mountPoint))),
          (this.heatmapConfig = o),
          (this.heatmap = TMap3D.Utils.HeatmapUtil.create(o));
        o = void 0;
        if (!(o = Array.isArray(t) ? { autoMaxMin: !0, data: t } : TMap3D.BaseUtils.extend({}, t)).autoMaxMin) {
          if (!o.min || !o.max) throw 'need max and min when not auto';
          (this.min = o.min), (this.max = o.max);
        }
        t = o.data.map(function (e) {
          return n.updateMaxMin(e.value), n.convertData(e);
        });
        delete o.data, (this.dataConfig = o), (this.data = t);
        t = { max: this.max, min: this.min, data: t };
        this.heatmap.setData(t),
          this.updateCesium(r.enabled),
          (this.cameraMoveEnd = function () {
            return n.updateCesium(!0);
          }),
          (this.rectangleEntity = this.viewer.entities.add({
            polygon: {
              material: this.heatmap.getDataURL(),
              hierarchy: Cesium.Cartesian3.fromDegreesArray(this.recToPolygon()),
            },
          }));
      }
    });
    (e.prototype.updateHeatmap = function () {
      var e = this.viewer.camera.getMagnitude(),
        t = this.autoRadiusConfig,
        i = t.min,
        o = t.max,
        n = t.minRadius,
        t = t.maxRadius;
      parseInt(n + ((t - n) * (e - i)) / (o - i));
      this.heatmap.setData({
        max: this.max,
        min: this.min,
        data: this.data.map(function (e) {
          return { x: e.x, y: e.y, value: e.value, radius: 5 };
        }),
      });
    }),
      (e.prototype.updateCesium = function (e) {
        e && this.updateHeatmap(),
          this.rectangleEntity && (this.rectangleEntity.polygon.material = this.heatmap.getDataURL());
      }),
      (e.prototype.recToPolygon = function () {
        return [
          this.bbox[0],
          this.bbox[1],
          this.bbox[2],
          this.bbox[1],
          this.bbox[2],
          this.bbox[3],
          this.bbox[0],
          this.bbox[3],
          this.bbox[0],
          this.bbox[1],
        ];
      }),
      (e.prototype.convertData = function (e) {
        var t = e.x,
          i = e.y,
          e = e.value,
          i = this.gps2point([t, i]).slice(0, 2);
        return { x: i[0], y: i[1], value: e };
      }),
      (e.prototype.updateMaxMin = function (e) {
        void 0 === this.max ? (this.max = e) : (this.max = Math.max(e, this.max)),
          void 0 === this.min ? (this.min = e) : (this.min = Math.min(e, this.min));
      }),
      (e.prototype.gps2point = function () {
        var e = (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : []).slice(0, 2),
          t = e[0],
          i = e[1],
          o = this.boxMeta,
          n = o.top,
          r = o.left,
          s = o.height,
          e = o.width,
          o = this.canvasConfig;
        return [parseInt(((t - r) / e) * o.width), parseInt(((n - i) / s) * o.height)];
      }),
      (e.prototype.destory = function () {
        this.viewer.camera.moveEnd.removeEventListener(this.cameraMoveEnd),
          this.rectangleEntity && this.viewer.entities.remove(this.rectangleEntity),
          this.mountPoint && this.mountPoint.remove();
      }),
      (e.prototype.show = function () {
        this.rectangleEntity && (this.rectangleEntity.show = !0);
      }),
      (e.prototype.hide = function () {
        this.rectangleEntity && (this.rectangleEntity.show = !1);
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.ScanLine = function (e, t, i) {
      (this.viewer = e),
        (this.position = t),
        (this.radius = (i = i || {}).radius || 200),
        (this.color = i.color || Cesium.Color.YELLOW),
        (this.speed = i.speed || 10),
        this.addEnt();
    });
    (e.prototype.addEnt = function () {
      this.ent = this.viewer.entities.add({
        position: this.position,
        ellipse: {
          semiMinorAxis: this.radius,
          semiMajorAxis: this.radius,
          material: new Cesium.ScanlineMaterialProperty(this.color, this.speed),
          classificationType: Cesium.ClassificationType.BOTH,
        },
      });
    }),
      (e.prototype.remove = function () {
        this.viewer.remove(this.ent);
      });
  })(),
  (function () {
    var e = (TMap3D.ElectricRippleShield = function (e, t, i) {
      (this.loop = !0),
        (this.visualizer = e),
        (this.basePosition = this.visualizer._center),
        (this.baseLonLat = TMap3D.Utils.MapUtils.cartesian3ToLonLat(this.basePosition)),
        (this.position = t),
        (this.radius = i && i.radius ? i.radius : 200),
        (this.color = i && i.color ? i.color : '#32CD32'),
        (this.fog = !1),
        (this.opacity = 1),
        (this.num = 2),
        this._init(),
        this._update();
    });
    (e.prototype._init = function () {
      var e = [
          'precision lowp float;',
          'precision lowp int;',
          '#ifdef USE_FOG',
          '   varying float fogDepth;',
          '#endif',
          'varying vec2 vUv;',
          'void main() {',
          '   vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
          '   vUv = uv;',
          '   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
          '   #ifdef USE_FOG',
          '       fogDepth = -mvPosition.z;',
          '   #endif',
          '}',
        ].join('\n'),
        i = [
          '#extension GL_OES_standard_derivatives : enable',
          'uniform vec3 color;',
          'uniform float opacity;',
          'uniform float time;',
          'varying vec2 vUv;',
          'vec3 rands(vec3 c) {',
          '   float j = 4096.0*sin(dot(c,vec3(17.0, 59.4, 15.0)));',
          '   vec3 r;',
          '   r.z = fract(512.0*j);',
          '   j *= .125;',
          '   r.x = fract(512.0*j);',
          '   j *= .125;',
          '   r.y = fract(512.0*j);',
          '   return r-0.5;',
          '}',
          'const float F3 =  0.3333333;',
          'const float G3 =  0.1666667;',
          'float simplex3d(vec3 p) {',
          '   vec3 s = floor(p + dot(p, vec3(F3)));',
          '   vec3 x = p - s + dot(s, vec3(G3));',
          '   vec3 e = step(vec3(0.0), x - x.yzx);',
          '   vec3 i1 = e*(1.0 - e.zxy);',
          '   vec3 i2 = 1.0 - e.zxy*(1.0 - e);',
          '   vec3 x1 = x - i1 + G3;',
          '   vec3 x2 = x - i2 + 2.0*G3;',
          '   vec3 x3 = x - 1.0 + 3.0*G3;',
          '   vec4 w, d;',
          '   w.x = dot(x, x);',
          '   w.y = dot(x1, x1);',
          '   w.z = dot(x2, x2);',
          '   w.w = dot(x3, x3);',
          '   w = max(0.6 - w, 0.0);',
          '   d.x = dot(rands(s), x);',
          '   d.y = dot(rands(s + i1), x1);',
          '   d.z = dot(rands(s + i2), x2);',
          '   d.w = dot(rands(s + 1.0), x3);',
          '   w *= w;',
          '   w *= w;',
          '   d *= w;',
          '   return dot(d, vec4(52.0));',
          '}',
          'float noise(vec3 m) {',
          '   return   0.5333333*simplex3d(m)',
          '   +0.2666667*simplex3d(2.0*m)',
          '   +0.1333333*simplex3d(4.0*m)',
          '   +0.0666667*simplex3d(8.0*m);',
          '}',
          'void main() {',
          '   vec2 uv = vUv;',
          '   uv.x = uv.x - 0.5;',
          '   if (vUv.y < 0.5) {',
          '       discard;',
          '   }',
          '   vec3 p3 = vec3(vUv, time*0.4);',
          '   float intensity = noise(vec3(p3*12.0+12.0));',
          '   float t = clamp((uv.x * -uv.x * 0.2) + 0.15, 0., 1.);',
          '   float y = fract(abs(intensity * -t + fract(uv.y) - fract(-time)));',
          '   float g = pow(y, 0.15);',
          '   vec3 col = vec3(2.);',
          '   col = col * -g + col;',
          '   col = col * col;',
          '   col = col * col;',
          '   gl_FragColor = vec4(col * color, opacity);',
          '}',
        ].join('\n'),
        o = [
          '#extension GL_OES_standard_derivatives : enable',
          'uniform vec3 color;',
          'uniform float opacity;',
          'uniform float time;',
          'varying vec2 vUv;',
          '#define pi 3.1415926535',
          '#define PI2RAD 0.01745329252',
          '#define TWO_PI (2. * PI)',
          'float rands(float p){',
          'return fract(sin(p) * 10000.0);',
          '}',
          'float noise(vec2 p){',
          'float t = time / 20000.0;',
          'if(t > 1.0) t -= floor(t);',
          'return rands(p.x * 14. + p.y * sin(t) * 0.5);',
          '}',
          'vec2 sw(vec2 p){',
          '  return vec2(floor(p.x), floor(p.y));',
          '}',
          'vec2 se(vec2 p){',
          '   return vec2(ceil(p.x), floor(p.y));',
          '}',
          'vec2 nw(vec2 p){',
          'return vec2(floor(p.x), ceil(p.y));',
          '}',
          'vec2 ne(vec2 p){',
          '  return vec2(ceil(p.x), ceil(p.y));',
          '}',
          'float smoothNoise(vec2 p){',
          'vec2 inter = smoothstep(0.0, 1.0, fract(p));',
          'float s = mix(noise(sw(p)), noise(se(p)), inter.x);',
          'float n = mix(noise(nw(p)), noise(ne(p)), inter.x);',
          'return mix(s, n, inter.y);',
          '}',
          'float fbm(vec2 p){',
          'float z = 2.0;',
          'float rz = 0.0;',
          'vec2 bp = p;',
          'for(float i = 1.0; i < 6.0; i++){',
          'rz += abs((smoothNoise(p) - 0.5)* 2.0) / z;',
          '  z *= 2.0;',
          '  p *= 2.0;',
          '}',
          'return rz;',
          '}',
          'void main() {',
          'vec2 uv = vUv;',
          'vec2 uv2 = vUv;',
          'if (uv.y < 0.5) {',
          '  discard;',
          '}',
          'uv *= 4.;',
          'float rz = fbm(uv);',
          'uv /= exp(mod(time * 2.0, pi));',
          'rz *= pow(15., 0.9);',
          'gl_FragColor = mix(vec4(color, opacity) / rz, vec4(color, 0.1), 0.5);',
          ' if (uv2.x < 0.05) {',
          '  gl_FragColor = mix(vec4(color, 0.1), gl_FragColor, uv2.x / 0.05);',
          '}',
          'if (uv2.x > 0.95){',
          '  gl_FragColor = mix(gl_FragColor, vec4(color, 0.1), (uv2.x - 0.95) / 0.05);',
          '}',
          '}',
        ].join('\n');
      (t = {
        time: { type: 'f', value: 0 },
        color: { type: 'c', value: new THREE.Color(this.color) },
        opacity: { type: 'f', value: this.opacity },
        num: { type: 'f', value: this.num },
      }),
        (this.material = new THREE.ShaderMaterial({
          uniforms: t,
          vertexShader: e,
          fragmentShader: i,
          blending: THREE.AdditiveBlending,
          transparent: !0,
          depthWrite: !1,
          depthTest: !0,
          side: THREE.DoubleSide,
        })),
        (this.geometry = new THREE.SphereBufferGeometry(this.radius, 32, 32)),
        (this.mesh = new THREE.Mesh(this.geometry, this.material)),
        this.mesh.rotateX(Math.PI / 2),
        this.mesh.rotateY(Math.PI),
        (this.mesh.renderOrder = 100);
      i = {
        time: { type: 'f', value: 0 },
        color: { type: 'c', value: new THREE.Color(this.color) },
        opacity: { type: 'f', value: this.opacity },
      };
      (this.material2 = new THREE.ShaderMaterial({
        uniforms: i,
        vertexShader: e,
        fragmentShader: o,
        blending: THREE.AdditiveBlending,
        transparent: !0,
        depthWrite: !1,
        depthTest: !0,
        side: THREE.DoubleSide,
      })),
        (this.geometry2 = new THREE.SphereBufferGeometry(this.radius, 32, 32)),
        (this.mesh2 = new THREE.Mesh(this.geometry2, this.material2)),
        this.mesh2.rotateX(Math.PI / 2),
        this.mesh2.rotateY(Math.PI),
        (this.mesh2.renderOrder = 100),
        (this.object3d = new THREE.Object3D()),
        this.object3d.add(this.mesh),
        this.object3d.add(this.mesh2);
      o = this.getXY(this.position.lon, this.position.lat);
      (this.object3d.rotation.x = -Math.PI / 2),
        this.object3d.position.set(o.x, 0, -o.y),
        this.visualizer.add(this.object3d);
    }),
      (e.prototype.getXY = function (e, t) {
        var i = Cesium.Cartesian3.fromDegrees(e, this.baseLonLat[1]),
          o = Cesium.Cartesian3.fromDegrees(this.baseLonLat[0], t);
        return {
          x: Cesium.Cartesian3.distance(this.basePosition, i) * (e >= this.baseLonLat[0] ? 1 : -1),
          y: Cesium.Cartesian3.distance(this.basePosition, o) * (t >= this.baseLonLat[1] ? 1 : -1),
        };
      }),
      (e.prototype._update = function () {
        this.loop &&
          ((this.material.uniforms.time.value += 0.006),
          (this.material2.uniforms.time.value += 0.012),
          requestAnimationFrame(this._update.bind(this)));
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.NumberLineLayer = function (e, t, i) {
      (this.viewer = e),
        (this.visualizer = t),
        (this.basePosition = this.visualizer._center),
        (this.baseLonLat = TMap3D.Utils.MapUtils.cartesian3ToLonLat(this.basePosition)),
        (this.color = i),
        (this._objects = []),
        this._update();
    });
    (e.prototype._initMarkerNumberMaterial = function (e) {
      var t = new THREE.TextureLoader().load(TMap3D.BaseUtils.getHostPath() + '/TMap/effects/fly0101_03.png');
      (t.wrapS = t.wrapT = THREE.RepeatWrapping), t.repeat.set(1, 1);
      var i = new THREE.TextureLoader().load(TMap3D.BaseUtils.getHostPath() + '/TMap/effects/alpha_gradient.png');
      i.repeat.set(1, 1);
      var e = new THREE.MeshBasicMaterial({
          color: e,
          side: THREE.DoubleSide,
          transparent: !0,
          depthWrite: !1,
          depthTest: !0,
          blending: THREE.AdditiveBlending,
        }),
        o = { material: e };
      return (
        (e.onBeforeCompile = function (e) {
          (e.uniforms.iTime = { value: 0 }),
            (e.uniforms.numTex = { value: t }),
            (e.uniforms.alphaTex = { value: i }),
            (e.uniforms.offset = { value: 0 }),
            (e.vertexShader = e.vertexShader.replace(
              '#include <uv2_pars_vertex>',
              '#include <uv2_pars_vertex>\nuniform float iTime;varying vec2 nvUv;varying vec2 vtUv;mat3 setUvTransform(float tx, float ty, float sx, float sy, float rotation, float cx, float cy) {float c = cos( rotation );float s = sin( rotation );return mat3(sx * c, sx * s, - sx * ( c * cx + s * cy ) + cx + tx,- sy * s, sy * c, - sy * ( - s * cx + c * cy ) + cy + ty,tx, ty, 1);}',
            )),
            (e.vertexShader = e.vertexShader.replace(
              '#include <uv2_vertex>',
              '\n                #include <uv2_vertex>\n\n                mat3 uvMat3 = setUvTransform(0.0, iTime, 1.0, 5.0, 0.0, 0.0, 0.0);\n                vec2 tUv = ( uvMat3 * vec3( uv, 1. ) ).xy;\n\n                nvUv = uv;\n                vtUv = tUv;\n                ',
            )),
            (e.fragmentShader = e.fragmentShader.replace(
              'uniform float opacity;',
              'uniform float opacity;uniform sampler2D numTex;uniform float offset;uniform sampler2D alphaTex;varying vec2 nvUv;varying vec2 vtUv;',
            )),
            (e.fragmentShader = e.fragmentShader.replace(
              'gl_FragColor = vec4( outgoingLight, diffuseColor.a );',
              ' vec4 resultColor = vec4(outgoingLight, opacity);vec2 vtUv2 = vec2(vtUv.x,vtUv.y-offset);vec4 nTexture = texture2D(numTex, vtUv2);resultColor *= nTexture;resultColor.a *= texture2D(alphaTex, nvUv).g;gl_FragColor = vec4( resultColor );',
            )),
            (o.sharder = e);
        }),
        o
      );
    }),
      (e.prototype.addMarkerNumberLine = function (e) {
        for (var t = new THREE.Object3D(), i = this, o = 0; o < e.length; o++) {
          var n = this._initMarkerNumberMaterial(this.color),
            r = this.getXY(e[o].lon, e[o].lat),
            s = new THREE.PlaneBufferGeometry(12, 600, 1, 1),
            s = new THREE.Mesh(s, n.material);
          s.rotateX(Math.PI / 2),
            (s.onBeforeRender = function (e) {
              this.rotation.y = 2 * Math.PI - i.viewer.camera.heading;
            }),
            s.position.set(r.x, r.y, 300 + e[o].height),
            t.add(s),
            (s.mObj = n);
        }
        (t.renderOrder = 100), (t.rotation.x = -Math.PI / 2), this.visualizer.add(t), this._objects.push(t);
      }),
      (e.prototype._update = function () {
        for (var e = 0; e < this._objects.length; e++)
          for (var t = 0; t < this._objects[e].children.length; t++) {
            var i,
              o = this._objects[e].children[t].mObj;
            o &&
              o.sharder &&
              ((i = o.sharder.uniforms.offset.value),
              1 < (i += 0.02) && (i = 0),
              (o.sharder.uniforms.offset.value = i),
              (o.sharder.needsUpdate = !0));
          }
        requestAnimationFrame(this._update.bind(this));
      }),
      (e.prototype.getXY = function (e, t) {
        var i = Cesium.Cartesian3.fromDegrees(e, this.baseLonLat[1]),
          o = Cesium.Cartesian3.fromDegrees(this.baseLonLat[0], t);
        return {
          x: Cesium.Cartesian3.distance(this.basePosition, i) * (e >= this.baseLonLat[0] ? 1 : -1),
          y: Cesium.Cartesian3.distance(this.basePosition, o) * (t >= this.baseLonLat[1] ? 1 : -1),
        };
      }),
      (e.prototype.removeAll = function () {
        for (var e = 0; e < this._objects.length; e++) this.visualizer.remove(this._objects[e]);
        this._objects.length = 0;
      });
  })(),
  (function () {
    function e(e, t) {
      for (var i = 0; i < t.length; i++) {
        var o = t[i];
        (o.enumerable = o.enumerable || !1),
          (o.configurable = !0),
          'value' in o && (o.writable = !0),
          Object.defineProperty(e, o.key, o);
      }
    }
    function t() {
      (this.positions = []),
        (this.previous = []),
        (this.next = []),
        (this.side = []),
        (this.width = []),
        (this.indices_array = []),
        (this.uvs = []),
        (this.counters = []),
        (this.geometry = new THREE.BufferGeometry()),
        (this.widthCallback = null),
        (this.matrixWorld = new THREE.Matrix4());
    }
    var i, o;
    Nx =
      ((i = t),
      (o = [
        {
          key: 'setMatrixWorld',
          value: function (e) {
            this.matrixWorld = e;
          },
        },
        {
          key: 'setGeometry',
          value: function (e, t) {
            if (((this.widthCallback = t), (this.positions = []), (this.counters = []), e instanceof THREE.Geometry))
              for (var i = 0; i < e.vertices.length; i++) {
                var o = e.vertices[i],
                  n = i / e.vertices.length;
                this.positions.push(o.x, o.y, o.z),
                  this.positions.push(o.x, o.y, o.z),
                  this.counters.push(n),
                  this.counters.push(n);
              }
            if ((THREE.BufferGeometry, e instanceof Float32Array || e instanceof Array))
              for (var r = 0; r < e.length; r += 3) {
                var s = r / e.length;
                this.positions.push(e[r], e[r + 1], e[r + 2]),
                  this.positions.push(e[r], e[r + 1], e[r + 2]),
                  this.counters.push(s),
                  this.counters.push(s);
              }
            this.process();
          },
        },
        {
          key: 'compareV3',
          value: function (e, t) {
            (e *= 6), (t *= 6);
            return (
              this.positions[e] === this.positions[t] &&
              this.positions[1 + e] === this.positions[1 + t] &&
              this.positions[2 + e] === this.positions[2 + t]
            );
          },
        },
        {
          key: 'copyV3',
          value: function (e) {
            e *= 6;
            return [this.positions[e], this.positions[1 + e], this.positions[2 + e]];
          },
        },
        {
          key: 'process',
          value: function () {
            var e,
              t,
              i = this.positions.length / 6;
            (this.previous = []),
              (this.next = []),
              (this.side = []),
              (this.width = []),
              (this.indices_array = []),
              (this.uvs = []);
            for (var o = 0; o < i; o++) this.side.push(1), this.side.push(-1);
            for (var n = 0; n < i; n++)
              (e = this.widthCallback ? this.widthCallback(n / (i - 1)) : 1), this.width.push(e), this.width.push(e);
            for (var r = 0; r < i; r++) this.uvs.push(r / (i - 1), 0), this.uvs.push(r / (i - 1), 1);
            (t = this.compareV3(0, i - 1) ? this.copyV3(i - 2) : this.copyV3(0)),
              this.previous.push(t[0], t[1], t[2]),
              this.previous.push(t[0], t[1], t[2]);
            for (var s = 0; s < i - 1; s++)
              (t = this.copyV3(s)), this.previous.push(t[0], t[1], t[2]), this.previous.push(t[0], t[1], t[2]);
            for (var a = 1; a < i; a++)
              (t = this.copyV3(a)), this.next.push(t[0], t[1], t[2]), this.next.push(t[0], t[1], t[2]);
            (t = this.compareV3(i - 1, 0) ? this.copyV3(1) : this.copyV3(i - 1)),
              this.next.push(t[0], t[1], t[2]),
              this.next.push(t[0], t[1], t[2]);
            for (var l = 0; l < i - 1; l++) {
              var h = 2 * l;
              this.indices_array.push(h, 1 + h, 2 + h), this.indices_array.push(2 + h, 1 + h, 3 + h);
            }
            this.attributes
              ? (this.attributes.position.copyArray(new Float32Array(this.positions)),
                (this.attributes.position.needsUpdate = !0),
                this.attributes.previous.copyArray(new Float32Array(this.previous)),
                (this.attributes.previous.needsUpdate = !0),
                this.attributes.next.copyArray(new Float32Array(this.next)),
                (this.attributes.next.needsUpdate = !0),
                this.attributes.side.copyArray(new Float32Array(this.side)),
                (this.attributes.side.needsUpdate = !0),
                this.attributes.width.copyArray(new Float32Array(this.width)),
                (this.attributes.width.needsUpdate = !0),
                this.attributes.uv.copyArray(new Float32Array(this.uvs)),
                (this.attributes.uv.needsUpdate = !0),
                this.attributes.index.copyArray(new Uint16Array(this.indices_array)),
                (this.attributes.index.needsUpdate = !0))
              : (this.attributes = {
                  position: new THREE.BufferAttribute(new Float32Array(this.positions), 3),
                  previous: new THREE.BufferAttribute(new Float32Array(this.previous), 3),
                  next: new THREE.BufferAttribute(new Float32Array(this.next), 3),
                  side: new THREE.BufferAttribute(new Float32Array(this.side), 1),
                  width: new THREE.BufferAttribute(new Float32Array(this.width), 1),
                  uv: new THREE.BufferAttribute(new Float32Array(this.uvs), 2),
                  index: new THREE.BufferAttribute(new Uint16Array(this.indices_array), 1),
                  counters: new THREE.BufferAttribute(new Float32Array(this.counters), 1),
                }),
              this.geometry.setAttribute('position', this.attributes.position),
              this.geometry.setAttribute('previous', this.attributes.previous),
              this.geometry.setAttribute('next', this.attributes.next),
              this.geometry.setAttribute('side', this.attributes.side),
              this.geometry.setAttribute('width', this.attributes.width),
              this.geometry.setAttribute('uv', this.attributes.uv),
              this.geometry.setAttribute('counters', this.attributes.counters),
              this.geometry.setIndex(this.attributes.index);
          },
        },
      ]) && e(i.prototype, o),
      n && e(i, n),
      t);
    var n = (TMap3D.Effects.ThreeSpriteLine = function (e, t, i, o) {
      (this.viewer = e),
        (this.visualizer = t),
        (this.basePosition = this.visualizer._center),
        (this.baseLonLat = TMap3D.Utils.MapUtils.cartesian3ToLonLat(this.basePosition)),
        (this.loop = !0),
        (this.points = i),
        (this.lineWidth = o && o.lineWidth ? o.lineWidth : 10),
        (this.height = o && void 0 !== o.height ? o.height : 200),
        (this.type = o && o.type ? o.type : 'curveLine'),
        (this.color = o && o.color ? o.color : '#00ff00'),
        (this.colorEnd = o && o.colorEnd ? o.colorEnd : '#ff0000'),
        (this.colorFlow = o && o.colorFlow ? o.colorFlow : '#fffff0'),
        (this.depthTest = !o || void 0 === o.depthTest || o.depthTest),
        (this.fog = !1),
        (this.trailOpacity = o && o.trailOpacity ? o.trailOpacity : 0.3),
        (this.clientWidth = document.body.clientWidth),
        (this.clientWidth = document.body.clientHeight),
        (this.num = 1),
        (this.percent = 2),
        (this.segment = 32),
        (this.lineHeight = o && o.lineHeight ? o.lineHeight : 2),
        o && o.lineWidthZoom && (this.lineWidthZoom = o.lineWidthZoom),
        (this.duration = 1800 + 500 * Math.random()),
        this._init(),
        this._update();
    });
    (n.prototype._init = function () {
      var e = [
          '#extension GL_OES_standard_derivatives : enable',
          'precision highp float;',
          '#ifdef USE_LOGDEPTHBUF',
          '#ifdef USE_LOGDEPTHBUF_EXT',
          'varying float vFragDepth;',
          'varying float vIsPerspective;',
          '#else',
          'uniform float logDepthBufFC;',
          '#endif',
          '#endif',
          '#ifdef USE_FOG',
          'varying float fogDepth;',
          '#endif',
          'attribute vec3 position;',
          'attribute vec3 previous;',
          'attribute vec3 next;',
          'attribute float side;',
          'attribute float width;',
          'attribute vec2 uv;',
          'attribute float counters;',
          'uniform mat4 projectionMatrix;',
          'uniform mat4 modelViewMatrix;',
          'uniform vec2 resolution;',
          'uniform float lineWidth;',
          'uniform float near;',
          'uniform float far;',
          'uniform float sizeAttenuation;',
          'varying vec2 vUv;',
          'vec2 fix( vec4 i, float aspect ) {',
          '  vec2 res = i.xy / i.w;',
          '  res.x *= aspect;',
          '  return res;',
          '}',
          'void main() {',
          'float aspect = resolution.x / resolution.y;',
          'float pixelWidthRatio = 1. / (resolution.x * projectionMatrix[0][0]);',
          'vUv = uv;',
          'mat4 m = projectionMatrix * modelViewMatrix;',
          'vec4 finalPosition = m * vec4( position, 1.0 );',
          'vec4 prevPos = m * vec4( previous, 1.0 );',
          'vec4 nextPos = m * vec4( next, 1.0 );',
          'vec2 currentP = fix( finalPosition, aspect );',
          'vec2 prevP = fix( prevPos, aspect );',
          'vec2 nextP = fix( nextPos, aspect );',
          'float pixelWidth = finalPosition.w * pixelWidthRatio;',
          'float w = 1.8 * pixelWidth * lineWidth * width;',
          'if( sizeAttenuation == 1. ) {',
          '  w = 1.8 * lineWidth * width;',
          '}',
          'vec2 dir;',
          'if( nextP == currentP ) dir = normalize( currentP - prevP );',
          'else if( prevP == currentP ) dir = normalize( nextP - currentP );',
          'else {',
          '  vec2 dir1 = normalize( currentP - prevP );',
          '  vec2 dir2 = normalize( nextP - currentP );',
          '  dir = normalize( dir1 + dir2 );',
          '  vec2 perp = vec2( -dir1.y, dir1.x );',
          '  vec2 miter = vec2( -dir.y, dir.x );',
          '}',
          'vec2 normal = vec2( -dir.y, dir.x );',
          'normal.x /= aspect;',
          'normal *= .5 * w;',
          'vec4 offset = vec4( normal * side, 0.0, 1.0 );',
          'finalPosition.xy += offset.xy;',
          'gl_Position = finalPosition;',
          '#ifdef USE_LOGDEPTHBUF',
          '#ifdef USE_LOGDEPTHBUF_EXT',
          '\tvFragDepth = 1.0 + gl_Position.w;',
          '\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );',
          '#else',
          '\tif ( isPerspectiveMatrix( projectionMatrix ) ) {',
          '\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;',
          '\t\tgl_Position.z *= gl_Position.w;',
          '\t}',
          '#endif',
          '#endif',
          'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
          '#ifdef USE_FOG',
          'fogDepth = -mvPosition.z;',
          '#endif',
          '}',
        ].join('\n'),
        t = [
          '#extension GL_OES_standard_derivatives : enable',
          'precision highp float;',
          'uniform float visibility;',
          'uniform vec3 color;',
          'uniform vec3 color_end;',
          'uniform vec3 color_flow;',
          'uniform float lineWidth;',
          'uniform float time;',
          'uniform float trail_opacity;',
          'uniform float num;',
          'uniform float percent;',
          '#define PI 3.14159265359',
          '#define PI2 6.28318530718',
          '#define PI_HALF 1.5707963267949',
          '#define RECIPROCAL_PI 0.31830988618',
          '#define RECIPROCAL_PI2 0.15915494',
          '#define LOG2 1.442695',
          '#define EPSILON 1e-6',
          '#ifndef saturate',
          '#define saturate(a) clamp( a, 0.0, 1.0 )',
          '#endif',
          '#define whiteComplement(a) ( 1.0 - saturate( a ) )',
          'float pow2( const in float x ) { return x*x; }',
          'float pow3( const in float x ) { return x*x*x; }',
          'float pow4( const in float x ) { float x2 = x*x; return x2*x2; }',
          'float average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }',
          'highp float rand( const in vec2 uv ) {',
          '\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;',
          '\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );',
          '\treturn fract(sin(sn) * c);',
          '}',
          '#ifdef HIGH_PRECISION',
          '\tfloat precisionSafeLength( vec3 v ) { return length( v ); }',
          '#else',
          '\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }',
          '\tfloat precisionSafeLength( vec3 v ) {',
          '\t\tfloat maxComponent = max3( abs( v ) );',
          '\t\treturn length( v / maxComponent ) * maxComponent;',
          '\t}',
          '#endif',
          'struct IncidentLight {',
          '\tvec3 color;',
          '\tvec3 direction;',
          '\tbool visible;',
          '};',
          'struct ReflectedLight {',
          '\tvec3 directDiffuse;',
          '\tvec3 directSpecular;',
          '\tvec3 indirectDiffuse;',
          '\tvec3 indirectSpecular;',
          '};',
          'struct GeometricContext {',
          '\tvec3 position;',
          '\tvec3 normal;',
          '\tvec3 viewDir;',
          '#ifdef CLEARCOAT',
          '\tvec3 clearcoatNormal;',
          '#endif',
          '};',
          'vec3 transformDirection( in vec3 dir, in mat4 matrix ) {',
          '\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );',
          '}',
          'vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {',
          '\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );',
          '}',
          'vec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {',
          '\tfloat distance = dot( planeNormal, point - pointOnPlane );',
          '\treturn - distance * planeNormal + point;',
          '}',
          'float sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {',
          '\treturn sign( dot( point - pointOnPlane, planeNormal ) );',
          '}',
          'vec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {',
          '\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;',
          '}',
          'mat3 transposeMat3( const in mat3 m ) {',
          '\tmat3 tmp;',
          '\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );',
          '\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );',
          '\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );',
          '\treturn tmp;',
          '}',
          'float linearToRelativeLuminance( const in vec3 color ) {',
          '\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );',
          '\treturn dot( weights, color.rgb );',
          '}',
          'bool isPerspectiveMatrix( mat4 m ) {',
          '  return m[ 2 ][ 3 ] == - 1.0;',
          '}',
          '#ifdef USE_FOG',
          'uniform vec3 fogColor;',
          'varying float fogDepth;',
          '#ifdef FOG_EXP2',
          '\tuniform float fogDensity;',
          '#else',
          '\tuniform float fogNear;',
          '\tuniform float fogFar;',
          '#endif',
          '#endif',
          'varying vec2 vUv;',
          'void main() {',
          'vec2 uv = vUv;',
          'vec2 uv2 = uv;',
          'uv.x *= num;',
          'uv.x = mod(uv.x - time, 1.);',
          'uv.x = uv.x * percent - (percent - 1.);',
          'float trailOpacity = trail_opacity;',
          'gl_FragColor = vec4(mix(color, color_end, uv2.x), trailOpacity);',
          'if (uv.x > trailOpacity) {',
          '  gl_FragColor = vec4(mix(color_flow, gl_FragColor.rgb, 1.-uv.x), uv.x);',
          '}',
          '#ifdef USE_FOG',
          '#ifdef FOG_EXP2',
          'float fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );',
          '#else',
          'float fogFactor = smoothstep( fogNear, fogFar, fogDepth );',
          '#endif',
          '                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        .rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );',
          '#endif',
          '}',
        ].join('\n');
      (this.clientWidth = this.viewer.canvas.width),
        (this.clientHeight = this.viewer.canvas.height),
        (this._createTime = new Date().getTime()),
        (this._lastExecuteTime = this._createTime);
      var i = THREE.UniformsUtils.merge([
        THREE.UniformsLib.fog,
        {
          map: { type: 't', value: null },
          useMap: { type: 'f', value: 0 },
          alphaMap: { type: 'f', value: null },
          useAlphaMap: { type: 'f', value: 0 },
          resolution: { type: 'v2', value: new THREE.Vector2(this.clientWidth, this.clientHeight) },
          sizeAttenuation: { type: 'f', value: 0 },
          near: { type: 'f', value: 1 },
          far: { type: 'f', value: 1 },
          dashArray: { type: 'f', value: 0 },
          dashOffset: { type: 'f', value: 0 },
          dashRatio: { type: 'f', value: 0.5 },
          useDash: { type: 'f', value: 0 },
          visibility: { type: 'f', value: 1 },
          alphaTest: { type: 'f', value: 0 },
          lineWidth: { type: 'f', value: this.lineWidth },
          color: { type: 'c', value: new THREE.Color(this.color) },
          time: { type: 'f', value: 0 },
          color_end: { type: 'c', value: new THREE.Color(this.colorEnd) },
          color_flow: { type: 'c', value: new THREE.Color(this.colorFlow) },
          trail_opacity: { type: 'f', value: this.trailOpacity },
          num: { type: 'f', value: this.num },
          percent: { type: 'f', value: this.percent },
        },
      ]);
      this.material = new THREE.RawShaderMaterial({
        blending: THREE.AdditiveBlending,
        transparent: !0,
        depthWrite: !1,
        depthTest: this.depthTest,
        side: THREE.DoubleSide,
        fog: this.fog,
        defines: { USE_FOG: this.fog },
        uniforms: i,
        opacity: 0.5,
        vertexShader: e,
        fragmentShader: t,
      });
      (i = new Nx()), (e = new THREE.Geometry());
      if ('curveLine' == this.type) {
        var o = this.getXY(this.points[0].lon, this.points[0].lat);
        o = new THREE.Vector3(o.x, o.y, this.points[0].height);
        (t = this.getXY(this.points[1].lon, this.points[1].lat)),
          (t = new THREE.Vector3(t.x, t.y, this.points[1].height));
        (e.vertices = this._createPoints({ pt1: o, pt2: t, height: this.height, num: this.segment })),
          i.setGeometry(e),
          (this.mesh = new THREE.Mesh(i.geometry, this.material)),
          (this.mesh.rotation.x = -Math.PI / 2),
          (this.mesh.renderOrder = 100),
          this.visualizer.add(this.mesh);
      } else {
        for (var n = [], r = 0; r < this.points.length; r++) {
          var s = this.getXY(this.points[r].lon, this.points[r].lat),
            o = new THREE.Vector3(s.x - s.x, s.y - s.y, this.height);
          n.push(o);
        }
        (e.vertices = n),
          i.setGeometry(e),
          (this.mesh = new THREE.Mesh(i.geometry, this.material)),
          (this.mesh.renderOrder = 100),
          (this.mesh.rotation.x = -Math.PI / 2),
          this.visualizer.add(this.mesh);
      }
    }),
      (n.prototype._createPoints = function (e) {
        var t = e.height,
          i =
            Math.abs(e.pt1.x - e.pt2.x) > Math.abs(e.pt1.y - e.pt2.y)
              ? Math.abs(e.pt1.x - e.pt2.x)
              : Math.abs(e.pt1.y - e.pt2.y),
          o = e.num && 50 < e.num ? e.num : 50,
          n = [],
          r = i / o;
        if (Math.abs(e.pt1.x - e.pt2.x) > Math.abs(e.pt1.y - e.pt2.y)) {
          var s = (e.pt2.y - e.pt1.y) / o;
          0 < e.pt1.x - e.pt2.x && (r = -r);
          for (var a = 0; a < o; a++) {
            var l = t - (4 * Math.pow(-0.5 * i + Math.abs(r) * a, 2) * t) / Math.pow(i, 2),
              h = e.pt1.x + r * a,
              u = e.pt1.y + s * a;
            n.push(new THREE.Vector3(h, u, l + ((e.pt2.z - e.pt1.z) / o) * a + e.pt1.z));
          }
        } else {
          var c = (e.pt2.x - e.pt1.x) / o;
          0 < e.pt1.y - e.pt2.y && (r = -r);
          for (var p = 0; p < o; p++) {
            var d = t - (4 * Math.pow(-0.5 * i + Math.abs(r) * p, 2) * t) / Math.pow(i, 2),
              m = e.pt1.x + c * p,
              f = e.pt1.y + r * p;
            n.push(new THREE.Vector3(m, f, d + ((e.pt2.z - e.pt1.z) / o) * p + e.pt1.z));
          }
        }
        return n.push(new THREE.Vector3(e.pt2.x, e.pt2.y, e.pt2.z)), n;
      }),
      (n.prototype._update = function () {
        var e;
        this.loop &&
          this.material &&
          ((this.clientWidth = this.viewer.canvas.width),
          (this.clientHeight = this.viewer.canvas.height),
          (e = new Date().getTime()),
          (this.material.uniforms.time.value = ((e - this._createTime) % this.duration) / this.duration),
          (this.material.uniforms.resolution.value = new THREE.Vector2(this.clientWidth, this.clientHeight)),
          requestAnimationFrame(this._update.bind(this)));
      }),
      (n.prototype.destory = function () {
        (this.loop = !1),
          this.visualizer.remove(this.mesh),
          this.mesh.geometry.dispose(),
          (this.mesh = null),
          this.material.dispose(),
          (this.material = null);
      }),
      (n.prototype.getXY = function (e, t) {
        var i = Cesium.Cartesian3.fromDegrees(e, this.baseLonLat[1]),
          o = Cesium.Cartesian3.fromDegrees(this.baseLonLat[0], t);
        return {
          x: Cesium.Cartesian3.distance(this.basePosition, i) * (e >= this.baseLonLat[0] ? 1 : -1),
          y: Cesium.Cartesian3.distance(this.basePosition, o) * (t >= this.baseLonLat[1] ? 1 : -1),
        };
      });
  })(),
  (function () {
    var e = (TMap3D.Effects.TransmitCylinder = function (e, t, i) {
      (this.viewer = e),
        (this.position = t),
        (this.position[2] = this.position[2] || 0),
        (this.opts = i || {}),
        (this.opts.radius = this.opts.radius || 100),
        (this.opts.height = this.opts.height || 2e3),
        (this.opts.color = this.opts.color || '#ffffff'),
        (this.opts.spreadLineWidth = this.opts.spreadLineWidth || 10),
        (this.cylinder = this._initCylinder());
    });
    (e.prototype._initCylinder = function () {
      for (var e = [], t = 1.5 * this.opts.radius, i = 0; i < 3; i++)
        for (
          var o = (function (e, t, i, o, n) {
              var r = TMap3D.Utils.MapUtils.webMoctorJW2PM(e.lon, e.lat),
                s = Math.PI * (1 / o - 0.5);
              n && (s += (n / 180) * Math.PI);
              for (var a = [], l = 0; l < o; ++l) {
                var h = s + (2 * l * Math.PI) / o,
                  u = r.lon + (t + ((i - t) / o) * l) * Math.cos(h),
                  h = r.lat + (t + ((i - t) / o) * l) * Math.sin(h),
                  h = TMap3D.Utils.MapUtils.inverseMercator(u, h);
                a.push(h);
              }
              return a;
            })({ lon: this.position[0], lat: this.position[1] }, (t / 3) * (3 - i), (t / 3) * (3 - (i + 1)), 60, 0),
            n = 0;
          n < o.length;
          n++
        )
          e.push(Cesium.Cartesian3.fromDegrees(o[n].lon, o[n].lat, (this.opts.height / 180) * (i * o.length + n)));
      return this.viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(
          this.position[0],
          this.position[1],
          this.position[2] + this.opts.height / 2,
        ),
        cylinder: {
          length: this.opts.height,
          topRadius: 0,
          bottomRadius: this.opts.radius,
          slices: 60,
          material: Cesium.Color.fromCssColorString(this.opts.color),
          outline: !1,
        },
        polyline: {
          positions: e,
          width: this.opts.spreadLineWidth,
          material: new Cesium.PolylineTrailLinkMaterialProperty(
            Cesium.Color.fromCssColorString(this.opts.color).withAlpha(0.2),
            5e3,
          ),
          clampToGround: !1,
        },
        ellipse: {
          height: 0,
          semiMinorAxis: 5 * this.opts.radius,
          semiMajorAxis: 5 * this.opts.radius,
          material: new Cesium.CircleWaveMaterialProperty({
            duration: 5e3,
            gradient: 0,
            color: Cesium.Color.fromCssColorString(this.opts.color),
            count: 4,
          }),
        },
      });
    }),
      (e.prototype.remove = function () {
        this.cylinder && this.viewer.entities.remove(this.cylinder), (this.cylinder = null);
      });
  })(),
  (function () {
    function i(e) {
      var t;
      if (Cesium.defined(e) && e instanceof Array && 4 == e.length)
        return (
          e[0] > e[2] && ((t = e[0]), (e[0] = e[2]), (e[2] = t)),
          e[1] > e[3] && ((t = e[1]), (e[1] = e[3]), (e[3] = t)),
          (e[0] = Math.max(e[0], -180)),
          (e[2] = Math.min(e[2], 180)),
          (e[1] = Math.max(e[1], -90)),
          (e[3] = Math.min(e[3], 90)),
          e
        );
    }
    var e = (TMap3D.Effects.ParticleReverse = function (e, t) {
      (this.viewer = e),
        (t = Cesium.defaultValue(t, Cesium.defaultValue.EMPTY_OBJECT)),
        (this.visibleHeight = Cesium.defaultValue(t.visibleHeight, 5e3)),
        (this.visibleHeight = Math.min(0, this.visibleHeight)),
        (this.visibleHeight = Math.max(5e4, this.visibleHeight)),
        (this.density = Cesium.defaultValue(t.density, 0.7)),
        (this.density = Math.max(0, this.density)),
        (this.density = Math.min(1, this.density)),
        (this.reverse = Cesium.defaultValue(t.reverse, !1)),
        (this.url = Cesium.defaultValue(t.url, void 0)),
        (this.scope = Cesium.defaultValue(t.scope, [-180, -90, 180, 90])),
        (this.scope = i(this.scope)),
        (this.show = Cesium.defaultValue(t.show, !0)),
        (this.type = 'snow');
      t = {
        type: 0,
        visibleHeight: this.visibleHeight,
        density: this.density,
        url: this.url,
        show: this.show,
        maxParticlesPerCell: t.maxParticlesPerCell,
        reverse: !0,
        scope: this.scope,
      };
      (this.primitive = new Cesium.FePrecipitation(t)), this.viewer.scene.primitives.add(this.primitive);
    });
    (e.prototype.remove = function () {
      this.viewer.scene.primitives.remove(this.primitive);
    }),
      (e.prototype.setVisible = function (e) {
        (this.show = e), (this.primitive.show = e);
      }),
      (e.prototype.getVisible = function () {
        return this.show;
      }),
      (e.prototype.setDensity = function (e) {
        (this.density = e), (this.primitive.density = e);
      }),
      (e.prototype.getDensity = function () {
        return this.density;
      }),
      (e.prototype.setScope = function (e) {
        (this.scope = e), (this.scope = i(this.scope)), (this.primitive.scope = this.scope);
      }),
      (e.prototype.getScope = function () {
        return this.scope;
      });
  })(),
  (function () {
    var e = (TMap3D.AnimationMarker = function (e, t, i) {
      (this.viewer = e),
        (this.visible = !0),
        (this.position = t),
        (this.cssColor = i),
        this.initDom(),
        this.initEvent();
    });
    (e.prototype.initDom = function () {
      (this.$htmlContainer = document.createElement('div')),
        (this.$htmlContainer.style = 'position:absolute;left:0px;bottom:0px;pointer-events: none');
      var e = document.createElement('div');
      e.classList.add('xt-animation-point'), (e.style = 'color:' + this.cssColor || 'red');
      var t = document.createElement('p');
      e.appendChild(t),
        this.$htmlContainer.appendChild(e),
        this.viewer.cesiumWidget.container.appendChild(this.$htmlContainer),
        this.viewer.scene.postRender.addEventListener(this.postRenderEvent, this);
    }),
      (e.prototype.initEvent = function () {
        this.viewer.scene.postRender.addEventListener(this.postRenderEventHandle, this);
      }),
      (e.prototype.postRenderEventHandle = function () {
        var e, t, i;
        this.visible
          ? ((e = this.viewer.scene.canvas.height),
            (t = new Cesium.Cartesian2()),
            Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, t),
            (this.$htmlContainer.style.bottom = e - t.y + 'px'),
            (i = this.$htmlContainer.offsetWidth),
            (this.$htmlContainer.style.left = t.x - i / 2 + 'px'),
            (e = this.viewer.camera.position),
            (i = t = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(e).height),
            (t += this.viewer.scene.globe.ellipsoid.maximumRadius),
            Cesium.Cartesian3.distance(e, this.position) > t
              ? (this.$htmlContainer.style.display = 'none')
              : ((this.$htmlContainer.style.display = 'block'),
                (this.$htmlContainer.style.display = i < 8e4 ? 'block' : 'none')))
          : (this.$htmlContainer.style.display = 'none');
      }),
      (e.prototype.remove = function () {
        this.viewer.scene.postRender.removeEventListener(this.postRenderEventHandle, this),
          this.$htmlContainer.remove();
      }),
      (e.prototype.show = function () {
        this.visible = !0;
      }),
      (e.prototype.hide = function () {
        this.visible = !1;
      });
  })(),
  (function () {
    var e = (TMap3D.TrailLineAnimate = function (e, t) {
      (this.viewer = e), (this.opts = t || {}), this.initEvents();
    });
    (e.prototype.initEvents = function () {
      (this.AnimateStartEvent = new Cesium.Event()),
        (this.StopsArrivedEvent = new Cesium.Event()),
        (this.AnimateEndEvent = new Cesium.Event());
    }),
      (e.prototype.play = function (e, t, i) {
        this.stop(),
          (this.flowType = i || 'none'),
          (this.stops = e),
          (this.speed = t),
          this.addTrailLine(this.getPositions()),
          this.addTickEvent(),
          (this.isAnimating = !0),
          (this.nextStopsIndex = 0),
          (this.viewer.clock.shouldAnimate = !0);
      }),
      (e.prototype.getPositions = function () {
        var t = [];
        return (
          this.stops.forEach(function (e) {
            t.push(e.position);
          }),
          t
        );
      }),
      (e.prototype.addTrailLine = function (e) {
        this.trailLineInfo = this.getTrailLineInfo(e, this.speed || 25);
        var t = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16)),
          i = Cesium.JulianDate.addSeconds(t, this.trailLineInfo.timeInfo.timeSum, new Cesium.JulianDate());
        (this.viewer.clock.startTime = t.clone()),
          (this.viewer.clock.stopTime = i.clone()),
          (this.viewer.clock.currentTime = t.clone()),
          (this.viewer.clock.clockRange = Cesium.ClockRange.CLAMPED);
        e = this.computeCirclularFlight(e, t, this.trailLineInfo.timeInfo.siteTimes);
        this.addAminateModel(t, i, e),
          this.addAnimateLine(),
          this.calStopsTimes(t, this.trailLineInfo.timeInfo.siteTimes);
      }),
      (e.prototype.computeCirclularFlight = function (e, t, i) {
        for (var o = new Cesium.SampledPositionProperty(), n = 0; n < e.length; n++) {
          var r = Cesium.JulianDate.addSeconds(t, i[n], new Cesium.JulianDate());
          o.addSample(r, e[n]);
        }
        return o;
      }),
      (e.prototype.calStopsTimes = function (t, e) {
        var i = this;
        (this.stopsTimes = []),
          e.forEach(function (e) {
            e = Cesium.JulianDate.addSeconds(t, e, new Cesium.JulianDate());
            i.stopsTimes.push(e);
          });
      }),
      (e.prototype.addAminateModel = function (e, t, i) {
        'marker' === this.opts.type
          ? (this.animateModel = this.viewer.entities.add({
              availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ start: e, stop: t })]),
              position: i,
              orientation: new Cesium.VelocityOrientationProperty(i),
              billboard: {
                image: this.opts.url || TMap3D.BaseUtils.getHostPath() + '/TMap/car.png',
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              },
            }))
          : (this.animateModel = this.viewer.entities.add({
              availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ start: e, stop: t })]),
              position: i,
              orientation: new Cesium.VelocityOrientationProperty(i),
              model: {
                uri: this.opts.url || TMap3D.BaseUtils.getHostPath() + '/TMap/gltf/redCar.glb',
                scale: this.opts.scale || 0.1,
              },
            })),
          'tracked' === this.flowType && (this.viewer.trackedEntity = this.animateModel);
      }),
      (e.prototype.addAnimateLine = function () {
        var t = this;
        (this.linePositions = []),
          (this.animateLine = this.viewer.entities.add({
            polyline: {
              positions: new Cesium.CallbackProperty(function (e) {
                return (
                  t.linePositions.push(t.animateModel.position.getValue(t.viewer.clock.currentTime)), t.linePositions
                );
              }, !1),
              resolution: 1,
              material: new Cesium.PolylineGlowMaterialProperty({
                glowPower: 0.1,
                color: this.opts.color || Cesium.Color.YELLOW,
              }),
              width: this.opts.width || 10,
              clampToGround: !0,
            },
          }));
      }),
      (e.prototype.stop = function () {
        this.clear(),
          this.removeTickEvent(),
          (this.viewer.trackedEntity = null),
          this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY),
          (this.isAnimating = !1);
      }),
      (e.prototype.addTickEvent = function () {
        this.viewer.clock.onTick.addEventListener(this.tickEventHandler, this);
      }),
      (e.prototype.removeTickEvent = function () {
        this.viewer.clock.onTick.removeEventListener(this.tickEventHandler, this);
      }),
      (e.prototype.tickEventHandler = function () {
        var e,
          t,
          i,
          o = this.viewer.clock.currentTime,
          n = this.stopsTimes[this.nextStopsIndex];
        'firstPerson' === this.flowType
          ? ((e = this.animateModel.position.getValue(this.viewer.clock.currentTime)),
            (t = this.animateModel.orientation.getValue(this.viewer.clock.currentTime)),
            (i = Cesium.Transforms.eastNorthUpToFixedFrame(e)),
            (i = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(t), e)),
            this.viewer.camera.lookAtTransform(i, new Cesium.Cartesian3(-100, 0, 10)))
          : 'GodView' === this.flowType &&
            ((e = this.animateModel.position.getValue(this.viewer.clock.currentTime)),
            (t = this.animateModel.orientation.getValue(this.viewer.clock.currentTime)),
            (i = Cesium.Transforms.eastNorthUpToFixedFrame(e)),
            (i = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(t), e)),
            this.viewer.camera.lookAtTransform(i, new Cesium.Cartesian3(-50, 0, 250))),
          Cesium.JulianDate.equalsEpsilon(o, n, 0.1) &&
            (this.StopsArrivedEvent.raiseEvent(this.stops[this.nextStopsIndex], this.nextStopsIndex),
            this.nextStopsIndex++,
            this.nextStopsIndex == this.stopsTimes.length &&
              (this.removeTickEvent(),
              (this.isAnimating = !1),
              this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY),
              (this.viewer.trackedEntity = null),
              this.AnimateEndEvent.raiseEvent()));
      }),
      (e.prototype.clear = function () {
        this.viewer.entities.remove(this.animateModel),
          (this.animateModel = void 0),
          this.viewer.entities.remove(this.animateLine),
          (this.animateLine = void 0);
      }),
      (e.prototype.spaceDistance = function (e) {
        for (var t, i, o, n = 0, r = void 0, s = 0; s < e.length - 1; s++)
          (t = Cesium.Cartographic.fromCartesian(e[s])),
            (i = Cesium.Cartographic.fromCartesian(e[s + 1])),
            (r = new Cesium.EllipsoidGeodesic()).setEndPoints(t, i),
            (o = r.surfaceDistance),
            (n += Math.sqrt(Math.pow(o, 2) + Math.pow(i.height - t.height, 2)));
        return n.toFixed(3);
      }),
      (e.prototype.fromCoordinatesToCartesian3 = function (e) {
        var t = [];
        return (
          e.forEach(function (e) {
            t.push(Cesium.Cartesian3.fromDegrees(e[0], e[1], e[2]));
          }),
          t
        );
      }),
      (e.prototype.getTrailLineInfo = function (e, t) {
        var i = {};
        return (
          (i.timeInfo = this.getSiteTimes(e, t)),
          (i.startTime = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16))),
          (i.stopTime = Cesium.JulianDate.addSeconds(i.startTime, i.timeInfo.timeSum, new Cesium.JulianDate())),
          i
        );
      }),
      (e.prototype.getSiteTimes = function (e, t) {
        for (var i = [0], o = 0, n = 1; n < e.length; n++) (o += this.spaceDistance([e[n - 1], e[n]]) / t), i.push(o);
        return { timeSum: o, siteTimes: i };
      });
  })(),
  (function () {
    var e = (TMap3D.Controls.PlotDrawTip = function (e) {
      (this.viewer = e),
        (this.element = document.createElement('div')),
        this.element.classList.add('plot-draw-tip-container'),
        e.cesiumWidget.container.appendChild(this.element),
        this.addPostRender();
    });
    (e.prototype.setContent = function (e) {
      this.element.innerHTML = '';
      for (var t = 0; t < e.length; t++) {
        var i = document.createElement('div');
        (i.innerText = e[t]), this.element.append(i);
      }
    }),
      (e.prototype.updatePosition = function (e) {
        this.position = e;
      }),
      (e.prototype.addPostRender = function () {
        this.viewer.scene.postRender.addEventListener(this.postRender, this);
      }),
      (e.prototype.postRender = function () {
        var e, t;
        this.element &&
          this.element.style &&
          this.position &&
          ((e = this.viewer.scene.canvas.height),
          (t = new Cesium.Cartesian2()),
          Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, t),
          (this.element.style.bottom = e - t.y - 20 + 'px'),
          this.element.offsetWidth,
          (this.element.style.left = t.x + 50 + 'px'));
      }),
      (e.prototype.remove = function () {
        this.viewer.cesiumWidget.container.removeChild(this.element),
          this.viewer.scene.postRender.removeEventListener(this.postRender, this);
      });
  })(),
  (function () {
    var e = (TMap3D.Controls.PositionInfoStatusBar = function (e) {
      (this.viewer = e), this.createDom(), this.initEvent();
    });
    (e.prototype.createDom = function () {
      (this.container = document.createElement('div')),
        (this.container.className = 'position-info-status-bar'),
        this.viewer.container.appendChild(this.container);
      var e = document.createElement('div');
      (e.style.float = 'right'),
        this.container.appendChild(e),
        (this.divLng = document.createElement('div')),
        e.appendChild(this.divLng),
        (this.divLat = document.createElement('div')),
        e.appendChild(this.divLat),
        (this.divH = document.createElement('div')),
        e.appendChild(this.divH),
        (this.divHeading = document.createElement('div')),
        e.appendChild(this.divHeading),
        (this.divPitch = document.createElement('div')),
        e.appendChild(this.divPitch),
        (this.divcH = document.createElement('div')),
        e.appendChild(this.divcH);
    }),
      (e.prototype.initEvent = function () {
        var i = this;
        (this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
          this.eventHandler.setInputAction(function (e) {
            var t = i.viewer.scene.pickPosition(e.startPosition);
            (t = t || i.viewer.scene.camera.pickEllipsoid(e.startPosition, i.viewer.scene.globe.ellipsoid)) &&
              i.handleMouseMoveEvent(t);
          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE),
          (this.removeListener = this.viewer.scene.camera.changed.addEventListener(this.handleCameraMoveEvent, this));
      }),
      (e.prototype.handleMouseMoveEvent = function (e) {
        e = this.catesian3ToDegrees(e);
        (this.divLng.innerHTML = '经度：' + e.x.toFixed(6)),
          (this.divLat.innerHTML = '纬度：' + e.y.toFixed(6)),
          (this.divH.innerHTML = '高度：' + e.z.toFixed(6));
      }),
      (e.prototype.handleCameraMoveEvent = function () {
        (this.divHeading.innerHTML =
          '方向：' + Cesium.Math.toDegrees(this.viewer.scene.camera.heading).toFixed(0) + '度'),
          (this.divPitch.innerHTML =
            '俯仰角：' + Cesium.Math.toDegrees(this.viewer.scene.camera.pitch).toFixed(0) + '度');
        var e = this.catesian3ToDegrees(this.viewer.scene.camera.position);
        this.divcH.innerHTML = '视高：' + e.z.toFixed(6) + '米';
      }),
      (e.prototype.catesian3ToDegrees = function (e) {
        e = Cesium.Cartographic.fromCartesian(e);
        return { x: Cesium.Math.toDegrees(e.longitude), y: Cesium.Math.toDegrees(e.latitude), z: e.height };
      }),
      (e.prototype.show = function () {
        this.container.style.display = 'block';
      }),
      (e.prototype.hide = function () {
        this.container.style.display = 'none';
      }),
      (e.prototype.destroy = function () {
        this.eventHandler.destroy(), this.removeListener.call(), this.viewer.container.removeChild(this.container);
      });
  })(),
  (function () {
    var e = (TMap3D.LayerBase = function (e, t) {
      (this.viewer = e),
        (this.visibleHeight = t && t.visibleHeight ? t.visibleHeight : 1e4),
        (this.plots = []),
        (this.plotSelecteable = !1);
    });
    (e.prototype.setPlotSelectable = function (e) {
      this.plotSelecteable = e;
    }),
      (e.prototype.initPlots = function (e) {}),
      (e.prototype.addPlot = function (e) {}),
      (e.prototype.removeByPlotCode = function (e) {
        for (var t = 0; t < this.plots.length; t++)
          if (this.plots[t].properties.plotCode == e) return this.plots[t].remove(), void this.plots.splice(t, 1);
      }),
      (e.prototype.getByPlotCode = function (e) {
        for (var t = 0; t < this.plots.length; t++) if (this.plots[t].properties.plotCode == e) return this.plots[t];
      }),
      (e.prototype.removeAll = function () {
        this.clear();
      }),
      (e.prototype.clear = function () {
        this.plots.forEach(function (e) {
          e.remove();
        }),
          (this.plots = []);
      }),
      (e.prototype.show = function () {
        this.plots.forEach(function (e) {
          e.markerEntity && (e.markerEntity.show = !0),
            e.lineEntity && (e.lineEntity.show = !0),
            e.polygonEntity && (e.polygonEntity.show = !0),
            e.billboardEntity && (e.billboardEntity.show = !0);
        });
      }),
      (e.prototype.hide = function () {
        this.plots.forEach(function (e) {
          e.markerEntity && (e.markerEntity.show = !1),
            e.lineEntity && (e.lineEntity.show = !1),
            e.polygonEntity && (e.polygonEntity.show = !1),
            e.billboardEntity && (e.billboardEntity.show = !1);
        });
      });
  })(),
  (function () {
    var e = (TMap3D.Layers.HtmlPlotLayer = function (e, t) {
      TMap3D.LayerBase.call(this, e, t), (this.selectedPlotChanged = new Cesium.Event()), this.initEvent();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.LayerBase),
      (e.prototype.initEvent = function () {
        var t = this;
        (this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
          this.handler.setInputAction(function (e) {
            t.plotSelecteable &&
              ((e = t.viewer.scene.pick(e.position)) && e.id
                ? ((e.id && e.id.type && 'HtmlPlot' == e.id.type) ||
                    (t.selectedPlot &&
                      (t.selectedPlot.setSelected(!1),
                      (t.selectedPlot = void 0),
                      t.selectedPlotChanged.raiseEvent(void 0))),
                  (t.selectedPlot && t.selectedPlot.properties.plotCode == e.id.plotCode) ||
                    ((e = t.getByPlotCode(e.id.plotCode))
                      ? (t.clearSelectedPlot(),
                        (t.selectedPlot = e),
                        t.selectedPlot.setSelected(!0),
                        t.selectedPlotChanged.raiseEvent(e))
                      : (t.selectedPlot && (t.selectedPlot.setSelected(!1), (t.selectedPlot = void 0)),
                        t.selectedPlotChanged.raiseEvent(void 0))))
                : t.selectedPlot &&
                  (t.selectedPlot.setSelected(!1),
                  (t.selectedPlot = void 0),
                  t.selectedPlotChanged.raiseEvent(void 0)));
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.addPlot = function (e) {
        e = TMap3D.HtmlPlot.PlotFactory.createPlot(this.viewer, e.properties.plotType, e);
        return this.plots.push(e), (e.layer = this), e;
      }),
      (e.prototype.setSelectedPlot = function (e) {
        this.plotSelecteable &&
          (this.selectedPlot && this.selectedPlot.setSelected(!1),
          (this.selectedPlot = e),
          this.selectedPlot.setSelected(!0),
          this.selectedPlotChanged.raiseEvent(e));
      }),
      (e.prototype.clearSelectedPlot = function () {
        this.selectedPlot && (this.selectedPlot.setSelected(!1), (this.selectedPlot = void 0));
      }),
      (e.prototype.flyToByPlotCode = function (e) {
        e = this.getByPlotCode(e);
        e && (this.setSelectedPlot(e), this.viewer.flyTo(e.billboardEntity));
      });
  })(),
  (function () {
    var e = (TMap3D.Layers.GeoPlotLayer = function (e) {
      TMap3D.LayerBase.call(this, e), this.initEvent(), (this.selectedPlotChanged = new Cesium.Event());
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.LayerBase),
      (e.prototype.addPlot = function (e) {
        e = TMap3D.GeoPlot.PlotFactory.createPlot(this.viewer, e.properties.plotType, e);
        return this.plots.push(e), e;
      }),
      (e.prototype.flyToByPlotCode = function (e) {
        var t = this.getByPlotCode(e);
        if (t) {
          switch (t.properties.plotType) {
            case TMap3D.GeoPlot_PlotTypes.MARKER:
              this.viewer.flyTo(t.markerEntity);
              break;
            case TMap3D.GeoPlot_PlotTypes.NORMALFENCE:
            case TMap3D.GeoPlot_PlotTypes.DYNAMICFENCE:
              this.viewer.flyTo(t.fenceEntity);
          }
          this.setSelectedPlotByCode(e);
        }
      }),
      (e.prototype.initEvent = function () {
        var t = this;
        new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function (e) {
          t.plotSelecteable &&
            ((e = t.viewer.scene.pick(e.position)) && e.id
              ? ((e.id && e.id.type && 'GeoPlot' == e.id.type) ||
                  (t.selectedPlot &&
                    (t.selectedPlot.setSelected(!1),
                    (t.selectedPlot = void 0),
                    t.selectedPlotChanged.raiseEvent(void 0))),
                (t.selectedPlot && t.selectedPlot.properties.plotCode == e.id.plotCode) ||
                  ((e = t.getByPlotCode(e.id.plotCode))
                    ? (t.clearSelectedPlot(),
                      (t.selectedPlot = e),
                      t.selectedPlot.setSelected(!0),
                      t.selectedPlotChanged.raiseEvent(e))
                    : (t.selectedPlot && (t.selectedPlot.setSelected(!1), (t.selectedPlot = void 0)),
                      t.selectedPlotChanged.raiseEvent(void 0))))
              : t.selectedPlot &&
                (t.selectedPlot.setSelected(!1), (t.selectedPlot = void 0), t.selectedPlotChanged.raiseEvent(void 0)));
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.setSelectedPlotByCode = function (e) {
        this.clearSelectedPlot();
        e = this.getByPlotCode(e);
        e && ((this.selectedPlot = e), this.selectedPlot.setSelected(!0), this.selectedPlotChanged.raiseEvent(e));
      }),
      (e.prototype.clearSelectedPlot = function () {
        this.selectedPlot && (this.selectedPlot.setSelected(!1), (this.selectedPlot = void 0));
      });
  })(),
  (function () {
    var e = (TMap3D.Layers.MilitaryPlotLayer = function (e) {
      TMap3D.LayerBase.call(this, e), (this.selectedPlotChanged = new Cesium.Event()), this.initEvent();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.LayerBase),
      (e.prototype.addPlot = function (e) {
        e = TMap3D.MilitaryPlot.PlotFactory.createPlot(this.viewer, e.properties.plotType, e);
        return this.plots.push(e), e;
      }),
      (e.prototype.flyToByPlotCode = function (e) {
        var t,
          i = this,
          e = this.getByPlotCode(e);
        e &&
          (this.setSelectedPlot(e),
          (t = this.viewer.entities.add({
            polygon: {
              hierarchy: e.positions,
              perPositionHeight: !0,
              material: Cesium.Color.YELLOW.withAlpha(0.001),
              outline: !1,
            },
          })),
          this.viewer.flyTo(t).then(function () {
            i.viewer.entities.remove(t);
          }));
      }),
      (e.prototype.setSelectedPlot = function (e) {
        this.plotSelecteable &&
          (this.selectedPlot && this.selectedPlot.setSelected(!1),
          (this.selectedPlot = e),
          this.selectedPlot.setSelected(!0),
          this.selectedPlotChanged.raiseEvent(e));
      }),
      (e.prototype.clearSelectedPlot = function () {
        this.selectedPlot &&
          (this.selectedPlot.setSelected(!1), this.selectedPlot.openEditMode(!1), (this.selectedPlot = void 0));
      }),
      (e.prototype.initEvent = function () {
        var t = this;
        new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function (e) {
          t.plotSelecteable &&
            ((e = t.viewer.scene.pick(e.position)) && e.id
              ? ((e.id && e.id.type && 'MilitaryPlot' == e.id.type) ||
                  (t.selectedPlot &&
                    (t.selectedPlot.setSelected(!1),
                    (t.selectedPlot = void 0),
                    t.selectedPlotChanged.raiseEvent(void 0))),
                (t.selectedPlot && t.selectedPlot.properties.plotCode == e.id.plotCode) ||
                  ((e = t.getByPlotCode(e.id.plotCode))
                    ? ((t.selectedPlot = e), t.selectedPlot.setSelected(!0), t.selectedPlotChanged.raiseEvent(e))
                    : (t.selectedPlot && (t.selectedPlot.setSelected(!1), (t.selectedPlot = void 0)),
                      t.selectedPlotChanged.raiseEvent(void 0))))
              : t.selectedPlot &&
                (t.selectedPlot.setSelected(!1), (t.selectedPlot = void 0), t.selectedPlotChanged.raiseEvent(void 0)));
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      });
  })(),
  (function () {
    var e = (TMap3D.Layers.GltfPlotLayer = function (e) {
      TMap3D.LayerBase.call(this, e),
        this.viewer.selectedEntityChanged.addEventListener(this.selectedEntityChanged, this),
        (this.selectedPlotChanged = new Cesium.Event());
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.LayerBase),
      (e.prototype.addPlot = function (e) {
        e = new TMap3D.GltfPlot.GltfPlot(this.viewer, e);
        this.plots.push(e);
      }),
      (e.prototype.selectedEntityChanged = function (e) {
        if (this.plotSelecteable) {
          if (!e) return this.clearSelectedPlot(), void this.selectedPlotChanged.raiseEvent(void 0);
          e = this.getByPlotCode(e.plotCode);
          if (!e) return this.clearSelectedPlot(), void this.selectedPlotChanged.raiseEvent(void 0);
          if (this.selectedPlot) {
            if (this.selectedPlot.properties.plotCode == e.properties.plotCode) return;
            this.clearSelectedPlot();
          }
          (this.selectedPlot = e), this.selectedPlot.setSelected(!0), this.selectedPlotChanged.raiseEvent(e);
        }
      }),
      (e.prototype.flyToByPlotCode = function (e) {
        var t = this.getByPlotCode(e);
        t && (this.viewer.flyTo(t.gltfEntity), this.setSelectedPlotByCode(e));
      }),
      (e.prototype.setSelectedPlotByCode = function (e) {
        this.clearSelectedPlot();
        e = this.getByPlotCode(e);
        e && ((this.viewer.selectedEntity = e.gltfEntity), (this.selectedPlot = e), this.selectedPlot.setSelected(!0));
      }),
      (e.prototype.clearSelectedPlot = function () {
        this.selectedPlot &&
          (this.selectedPlot.setVisible(!0), this.selectedPlot.setSelected(!1), (this.selectedPlot = void 0));
      });
  })(),
  (function () {
    var e = (TMap3D.Layers.ParticelPlotLayer = function (e) {
      TMap3D.LayerBase.call(this, e), this.initEvent(), (this.selectedPlotChanged = new Cesium.Event());
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.LayerBase),
      (e.prototype.addPlot = function (e) {
        e = TMap3D.ParticlePlot.PlotFactory.createPlot(this.viewer, e.properties.plotType, e);
        this.plots.push(e);
      }),
      (e.prototype.initEvent = function () {
        var t = this;
        new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas).setInputAction(function (e) {
          t.plotSelecteable &&
            ((e = t.viewer.scene.pick(e.position)) && e.primitive && e.collection
              ? t.selectedEntityChanged(e)
              : t.selectedEntityChanged(void 0));
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.selectedEntityChanged = function (e) {
        if (!e) return this.clearSelectedPlot(), void this.selectedPlotChanged.raiseEvent(void 0);
        e = this.getPlotBy_textureAtlasGUID(e.collection._textureAtlasGUID);
        if (!e) return this.clearSelectedPlot(), void this.selectedPlotChanged.raiseEvent(void 0);
        if (this.selectedPlot) {
          if (this.selectedPlot.properties.plotCode == e.properties.plotCode) return;
          this.clearSelectedPlot();
        }
        (this.selectedPlot = e), this.selectedPlot.setSelected(!0), this.selectedPlotChanged.raiseEvent(e);
      }),
      (e.prototype.getPlotBy_textureAtlasGUID = function (e) {
        for (var t = 0; t < this.plots.length; t++) {
          var i = this.plots[t];
          if (i.particleSystem._billboardCollection._textureAtlasGUID == e) return i;
        }
      }),
      (e.prototype.flyToByPlotCode = function (e) {
        var t = this.getByPlotCode(e);
        t && (this.viewer.flyTo(t.gltfEntity), this.setSelectedPlotByCode(e));
      }),
      (e.prototype.setSelectedPlotByCode = function (e) {
        this.clearSelectedPlot();
        e = this.getByPlotCode(e);
        e && ((this.selectedPlot = e), this.selectedPlot.setSelected(!0));
      }),
      (e.prototype.clearSelectedPlot = function () {
        this.selectedPlot && (this.selectedPlot.setSelected(!1), (this.selectedPlot = void 0));
      });
  })(),
  (function () {
    var e = (TMap3D.HtmlPlot.HtmlPlotBase = function (e, t) {
      e &&
        ((this.properties = t.properties),
        (this.coordinates = t.geometry.coordinates),
        (this.style = this.properties.style || {}),
        (this.position = Cesium.Cartesian3.fromDegrees(this.coordinates[0], this.coordinates[1], this.coordinates[2])),
        (this.properties.plotBase = 'Html'),
        (this.viewer = e),
        this.addBillboard());
    });
    (e.prototype.setSelected = function (e) {
      e ? this.element.classList.add('is-selected') : this.element.classList.remove('is-selected'),
        this.setPointVisible(e);
    }),
      (e.prototype.addBillboard = function () {
        this.billboardEntity = this.viewer.entities.add({
          position: this.position,
          type: 'HtmlPlot',
          plotCode: this.properties.plotCode,
          point: {
            color: Cesium.Color.DARKBLUE.withAlpha(0.4),
            pixelSize: 6,
            outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
            outlineWidth: 2,
            scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4),
            disableDepthTestDistance: 500,
          },
        });
      }),
      (e.prototype.setPointVisible = function (e) {
        e
          ? ((this.billboardEntity.point.pixelSize = 10),
            (this.billboardEntity.point.outlineWidth = 3),
            (this.billboardEntity.point.outlineColor = Cesium.Color.YELLOW))
          : ((this.billboardEntity.point.pixelSize = 6),
            (this.billboardEntity.point.outlineWidth = 2),
            (this.billboardEntity.point.outlineColor = Cesium.Color.YELLOW.withAlpha(0.4)));
      }),
      (e.prototype.updatePosition = function (e) {
        this.billboardEntity.position = e;
        var t = Cesium.Cartographic.fromCartesian(e);
        (this.position = e),
          (this.coordinates = [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude), t.height]);
      }),
      (e.prototype.updateLabel = function (e) {
        (this.vmInstance.label = e), (this.properties.attr.label = e);
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'Point', coordinates: this.coordinates },
        };
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.billboardEntity),
          this.viewer.cesiumWidget.container.removeChild(this.element),
          this.viewer.scene.postRender.removeEventListener(this.postRender, this);
      });
  })(),
  (function () {
    var e = (TMap3D.HtmlPlot.GradientsLabel = function (e, t) {
      TMap3D.HtmlPlot.HtmlPlotBase.call(this, e, t),
        (this.properties.plotType = TMap3D.HtmlPlot_PlotTypes.GRADIENTSLABEL),
        (this.properties.plotName = '渐变文本'),
        (this.element = document.createElement('div'));
      t = document.createElement('div');
      (t.innerText = this.properties.attr.label),
        this.element.append(t),
        this.element.classList.add('gradients-labelPlot-container');
      var i = this;
      e.cesiumWidget.container.appendChild(this.element),
        (this.element.onclick = function (e) {
          i.layer && i.layer.setSelectedPlot && i.layer.setSelectedPlot(i);
        }),
        this.addPostRender();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.HtmlPlot.HtmlPlotBase),
      (e.prototype.addPostRender = function () {
        this.viewer.scene.postRender.addEventListener(this.postRender, this);
      }),
      (e.prototype.postRender = function () {
        var e, t;
        this.element &&
          this.element.style &&
          ((t = this.viewer.scene.canvas.height),
          (e = new Cesium.Cartesian2()),
          Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, e),
          (this.element.style.bottom = t - e.y + 40 + 'px'),
          (t = this.element.offsetWidth),
          (this.element.style.left = e.x - t / 2 + 'px'),
          this.viewer.camera.positionCartographic.height > this.layer.visibleHeight || !this.billboardEntity.show
            ? (this.element.style.display = 'none')
            : (this.element.style.display = 'block'));
      });
  })(),
  (function () {
    var e = (TMap3D.HtmlPlot.LocationLabel = function (e, t) {
      TMap3D.HtmlPlot.HtmlPlotBase.call(this, e, t),
        (this.properties.plotType = TMap3D.HtmlPlot_PlotTypes.LOCATIONLABEL),
        (this.properties.plotName = '简单文本'),
        (this.element = document.createElement('div'));
      t = document.createElement('div');
      (t.innerText = this.properties.attr.label),
        this.element.append(t),
        this.element.classList.add('LocationPlot-container');
      var i = this;
      (this.element.onclick = function (e) {
        i.layer && i.layer.setSelectedPlot && i.layer.setSelectedPlot(i);
      }),
        this.viewer.cesiumWidget.container.appendChild(this.element),
        this.addPostRender();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.HtmlPlot.HtmlPlotBase),
      (e.prototype.addPostRender = function () {
        this.viewer.scene.postRender.addEventListener(this.postRender, this);
      }),
      (e.prototype.postRender = function () {
        var e, t;
        this.element &&
          this.element.style &&
          ((t = this.viewer.scene.canvas.height),
          (e = new Cesium.Cartesian2()),
          Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, e),
          (this.this.element.style.bottom = t - e.y + 40 + 'px'),
          (t = this.element.offsetWidth),
          (this.element.style.left = e.x - t / 2 + 'px'),
          this.viewer.camera.positionCartographic.height > this.layer.visibleHeight || !this.billboardEntity.show
            ? (this.element.style.display = 'none')
            : (this.element.style.display = 'block'));
      });
  })(),
  (TMap3D.HtmlPlot.PlotFactory = {
    createPlot: function (e, t, i) {
      switch (t) {
        case TMap3D.HtmlPlot_PlotTypes.SIMPLELABEL:
          return new TMap3D.HtmlPlot.SimpleLabel(e, i);
        case TMap3D.HtmlPlot_PlotTypes.GRADIENTSLABEL:
          return new TMap3D.HtmlPlot.GradientsLabel(e, i);
        case TMap3D.HtmlPlot_PlotTypes.LOCATIONLABEL:
          return new TMap3D.HtmlPlot.LocationLabel(e, i);
      }
    },
  }),
  (function () {
    var e = (TMap3D.HtmlPlot.SimpleLabel = function (e, t) {
      TMap3D.HtmlPlot.HtmlPlotBase.call(this, e, t),
        (this.properties.plotType = TMap3D.HtmlPlot_PlotTypes.SIMPLELABEL),
        (this.properties.plotName = '简单文本'),
        (this.element = document.createElement('div'));
      t = document.createElement('div');
      (t.innerText = this.properties.attr.label),
        this.element.append(t),
        this.element.classList.add('LabelPlot-container');
      var i = this;
      (this.element.onclick = function (e) {
        i.layer && i.layer.setSelectedPlot && i.layer.setSelectedPlot(i);
      }),
        this.viewer.cesiumWidget.container.appendChild(this.element),
        this.addPostRender();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.HtmlPlot.HtmlPlotBase),
      (e.prototype.addPostRender = function () {
        this.viewer.scene.postRender.addEventListener(this.postRender, this);
      }),
      (e.prototype.postRender = function () {
        var e, t;
        this.element &&
          this.element.style &&
          ((t = this.viewer.scene.canvas.height),
          (e = new Cesium.Cartesian2()),
          Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, e),
          (this.element.style.bottom = t - e.y + 40 + 'px'),
          (t = this.element.offsetWidth),
          (this.element.style.left = e.x - t / 2 + 'px'),
          this.viewer.camera.positionCartographic.height > this.layer.visibleHeight || !this.billboardEntity.show
            ? (this.element.style.display = 'none')
            : (this.element.style.display = 'block'));
      });
  })(),
  (function () {
    var e = (TMap3D.GltfPlot.GltfPlot = function (e, t) {
      (this.viewer = e),
        (this.properties = t.properties),
        (this.coordinates = t.geometry.coordinates),
        (this.properties.plotType = 'Gltf'),
        (this.properties.plotName = 'Gltf'),
        (this.style = this.properties.style);
      t = new Cesium.HeadingPitchRoll(
        Cesium.Math.toRadians(this.style.heading),
        Cesium.Math.toRadians(0),
        Cesium.Math.toRadians(0),
      );
      (this.position = Cesium.Cartesian3.fromDegrees(this.coordinates[0], this.coordinates[1], this.coordinates[2])),
        (this.orientation = Cesium.Transforms.headingPitchRollQuaternion(this.position, t)),
        this.addGltfEntity();
    });
    (e.prototype.addGltfEntity = function () {
      this.gltfEntity = this.viewer.entities.add({
        type: 'GltfPlot',
        plotCode: this.properties.plotCode,
        position: this.position,
        orientation: this.orientation,
        model: {
          uri: this.properties.modelUrl,
          colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
          color: Cesium.Color.WHITE,
          scale: this.style.scale,
          maximumScale: this.style.scale,
        },
      });
    }),
      (e.prototype.setVisible = function (e) {
        this.gltfEntity.show = e;
      }),
      (e.prototype.setSelected = function (e) {
        e
          ? ((this.gltfEntity.model.silhouetteColor = Cesium.Color.fromAlpha(Cesium.Color.YELLOW, 1)),
            (this.gltfEntity.model.silhouetteSize = 4))
          : ((this.gltfEntity.model.silhouetteColor = Cesium.Color.fromAlpha(Cesium.Color.YELLOW, 1)),
            (this.gltfEntity.model.silhouetteSize = 0));
      }),
      (e.prototype.setScale = function (e) {
        (this.gltfEntity.model.scale = e), (this.gltfEntity.model.maximumScale = e), (this.style.scale = e);
      }),
      (e.prototype.getPosition = function () {
        return this.gltfEntity.position;
      }),
      (e.prototype.updatePosition = function (e) {
        this.gltfEntity.position = e;
        e = Cesium.Cartographic.fromCartesian(e);
        this.coordinates = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height];
      }),
      (e.prototype.updateHeading = function (e) {
        this.style.heading = e;
        e = new Cesium.HeadingPitchRoll(Cesium.Math.toRadians(e), Cesium.Math.toRadians(0), Cesium.Math.toRadians(0));
        this.gltfEntity.orientation = Cesium.Transforms.headingPitchRollQuaternion(this.position, e);
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.gltfEntity);
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'Point', coordinates: this.coordinates },
        };
      });
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.GeoPlotBase = function (e, t) {
      (this.viewer = e),
        (this.properties = t.properties),
        (this.properties.plotBase = 'GeoPlot'),
        (this.geometry = t.geometry),
        (this.coordinates = t.geometry.coordinates),
        (this.style = this.properties.style),
        this.generatePositions();
    });
    (e.prototype.generatePositions = function () {
      var t = this;
      this.positions = [];
      var e = void 0;
      switch (this.geometry.type) {
        case 'Point':
          e = [this.coordinates];
          break;
        case 'LineString':
          e = this.coordinates;
          break;
        case 'Polygon':
          e = this.coordinates[0];
      }
      e.forEach(function (e) {
        t.positions.push(Cesium.Cartesian3.fromDegrees(e[0], e[1], e[2]));
      });
    }),
      (e.prototype.setPositions = function (e) {
        switch (((this.positions = e || []), (this.coordinates = []), this.geometry.type)) {
          case 'Point':
            this.setPointCoordinates();
            break;
          case 'LineString':
            this.setLineStringCoordinates();
            break;
          case 'Polygon':
            this.setPolygonCoordinates();
        }
        this.updatePositionAction && this.updatePositionAction();
      }),
      (e.prototype.setPointCoordinates = function () {
        var e = Cesium.Cartographic.fromCartesian(this.positions[0]);
        this.coordinates = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height];
      }),
      (e.prototype.setLineStringCoordinates = function () {
        var t = this;
        this.positions.forEach(function (e) {
          (e = Cesium.Cartographic.fromCartesian(e)),
            (e = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height]);
          t.coordinates.push(e);
        });
      }),
      (e.prototype.setPolygonCoordinates = function () {
        var t = this;
        this.coordinates.push([]),
          this.positions.forEach(function (e) {
            (e = Cesium.Cartographic.fromCartesian(e)),
              (e = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height]);
            t.coordinates[0].push(e);
          });
      }),
      (e.prototype.getPositions = function () {
        return this.positions.slice(0);
      }),
      (e.prototype.getPositionCount = function () {
        return this.positions.length;
      }),
      (e.prototype.setSelected = function (e) {}),
      (e.prototype.openEditMode = function (e) {}),
      (e.prototype.remove = function () {});
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.Marker = function (e, t) {
      TMap3D.GeoPlot.GeoPlotBase.call(this, e, t),
        (this.properties.plotType = TMap3D.GeoPlot_PlotTypes.MARKER),
        (this.properties.plotName = '图标点'),
        (this.style = this.properties.style || this.getDefaultStyle()),
        this.createEntity(),
        (this.fixPositionCount = 1);
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.GeoPlot.GeoPlotBase),
      (e.prototype.createEntity = function () {
        this.markerEntity = this.viewer.entities.add({
          position: this.positions[0],
          plotType: 'GeoPlot',
          plotCode: this.properties.plotCode,
          billboard: {
            image: this.style.img,
            scaleByDistance: new Cesium.NearFarScalar(1300, 0.6, 12e3, 0.2),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          },
          point: {
            color: Cesium.Color.DARKBLUE.withAlpha(0.4),
            pixelSize: 0,
            outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
            outlineWidth: 0,
            scaleByDistance: new Cesium.NearFarScalar(1e3, 1, 4200, 0.4),
            disableDepthTestDistance: 500,
          },
        });
      }),
      (e.prototype.setSelected = function (e) {
        e
          ? ((this.markerEntity.point.pixelSize = 10), (this.markerEntity.point.outlineWidth = 3))
          : ((this.markerEntity.point.pixelSize = 0), (this.markerEntity.point.outlineWidth = 0));
      }),
      (e.prototype.getDefaultStyle = function () {
        return { img: TMap3D.BaseUtils.getHostPath() + '/TMap/sp.png' };
      }),
      (e.prototype.openEditMode = function (e) {
        var t = this;
        this.markerEntity.position = e
          ? new Cesium.CallbackProperty(function (e) {
              return t.positions[0];
            }, !1)
          : this.positions[0];
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'Point', coordinates: this.coordinates },
        };
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.markerEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.TextMarker = function (e, t) {
      TMap3D.GeoPlot.GeoPlotBase.call(this, e, t),
        (this.properties.plotType = TMap3D.GeoPlot_PlotTypes.TEXT),
        (this.properties.plotName = '文本'),
        (this.properties.attr = this.properties.attr || { text: '文本' }),
        (this.style = this.properties.style || this.getDefaultStyle()),
        this.createEntity(),
        (this.fixPositionCount = 1);
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.GeoPlot.GeoPlotBase),
      (e.prototype.createEntity = function () {
        this.textEntity = this.viewer.entities.add({
          position: this.positions[0],
          plotType: 'GeoPlot',
          plotCode: this.properties.plotCode,
          label: {
            text: this.properties.attr.text,
            fillColor: Cesium.Color.fromCssColorString(this.style.fillColor),
            scale: 0.5,
            font: 'normal 40px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e3),
            scaleByDistance: new Cesium.NearFarScalar(500, 1, 1500, 0.4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -10),
            outlineWidth: 9,
            outlineColor: Cesium.Color.fromCssColorString(this.style.outlineColor),
          },
          point: {
            color: Cesium.Color.DARKBLUE.withAlpha(0.4),
            pixelSize: 0,
            outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
            outlineWidth: 0,
            scaleByDistance: new Cesium.NearFarScalar(1e3, 1, 4200, 0.4),
            disableDepthTestDistance: 500,
          },
        });
      }),
      (e.prototype.getDefaultStyle = function () {
        return { fillColor: '#FFFF00', outlineColor: '#FF0000' };
      }),
      (e.prototype.setSelected = function (e) {
        e
          ? ((this.textEntity.point.pixelSize = 10), (this.textEntity.point.outlineWidth = 3))
          : ((this.textEntity.point.pixelSize = 0), (this.textEntity.point.outlineWidth = 0));
      }),
      (e.prototype.updateText = function () {
        this.textEntity.label.text = this.properties.attr.text;
      }),
      (e.prototype.openEditMode = function (e) {
        var t = this;
        this.textEntity.position = e
          ? new Cesium.CallbackProperty(function (e) {
              return t.positions[0];
            }, !1)
          : this.positions[0];
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'Point', coordinates: this.coordinates },
        };
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.textEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.Circle = function (e, t) {
      TMap3D.GeoPlot.GeoPlotBase.call(this, e, t),
        (this.properties.plotName = '正圆'),
        (this.properties.plotType = TMap3D.GeoPlot_PlotTypes.CIRCLE),
        (this.fixPositionCount = 2),
        this.createEntity();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.GeoPlot.GeoPlotBase),
      (e.prototype.updatePositionAction = function () {
        TMap3D.Utils.MapUtils.unifiedHeight(this.positions);
      }),
      (e.prototype.createEntity = function () {
        this.circleEntity = this.viewer.entities.add({
          plotType: 'GeoPlot',
          plotCode: this.properties.plotCode,
          position: this.positions[0],
          ellipse: {
            height: this.getHeight(),
            semiMinorAxis: this.getAxis(),
            semiMajorAxis: this.getAxis(),
            material: Cesium.Color.RED.withAlpha(0.6),
          },
        });
      }),
      (e.prototype.getHeight = function () {
        return TMap3D.Utils.MapUtils.getPositionHeight(this.positions[0]);
      }),
      (e.prototype.getAxis = function () {
        var e = this.positions[0],
          t = this.positions[0];
        return 1 < this.positions.length && (t = this.positions[1]), TMap3D.Utils.MapUtils.get2PositionDistance(e, t);
      }),
      (e.prototype.openEditMode = function (e) {
        var t = this;
        e
          ? ((this.circleEntity.position = new Cesium.CallbackProperty(function (e) {
              return t.positions[0];
            }, !1)),
            (this.circleEntity.ellipse.semiMinorAxis = new Cesium.CallbackProperty(function (e) {
              return t.getAxis();
            }, !1)),
            (this.circleEntity.ellipse.semiMajorAxis = new Cesium.CallbackProperty(function (e) {
              return t.getAxis();
            }, !1)),
            (this.circleEntity.ellipse.height = new Cesium.CallbackProperty(function (e) {
              return t.getHeight();
            }, !1)))
          : ((this.circleEntity.position = this.positions[0]),
            (this.circleEntity.ellipse.height = this.getHeight()),
            (this.circleEntity.ellipse.semiMajorAxis = this.getAxis()));
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'LineString', coordinates: this.coordinates },
        };
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.circleEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.Corridor = function (e, t, i) {
      TMap3D.GeoPlot.GeoPlotBase.call(this, e, t),
        (this.properties = TMap3D.BaseUtils.extend(t.properties, i)),
        (this.properties.plotName = TMap3D.GeoPlot_PlotTypes.CORRIDOR),
        (this.properties.height = this.properties.height || 5),
        (this.properties.width = this.properties.width || 0.1),
        (this.minPositionCount = 2),
        this.createEntity();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.GeoPlot.GeoPlotBase),
      (e.prototype.createEntity = function () {
        var e = this.properties.material || Cesium.Color.RED.withAlpha(0.6);
        this.corridorEntity = this.viewer.entities.add({
          plotType: 'GeoPlot',
          plotCode: this.properties.plotCode,
          polylineVolume: {
            positions: this.positions,
            width: this.properties.width,
            height: this.properties.height,
            extrudedHeight: this.properties.extrudedHeight,
            cornerType: Cesium.CornerType.BEVELED,
            material: e,
          },
        });
      }),
      (e.prototype.setMaterial = function (e) {
        e && ((this.corridorEntity.material = e), (this.properties.material = e));
      }),
      (e.prototype.openEditMode = function (e) {
        var t = this;
        this.corridorEntity.polylineVolume.positions = e
          ? new Cesium.CallbackProperty(function (e) {
              return t.positions;
            }, !1)
          : this.positions;
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.corridorEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.NormalFence = function (e, t) {
      TMap3D.GeoPlot.GeoPlotBase.call(this, e, t),
        (this.properties.plotType = TMap3D.GeoPlot_PlotTypes.NORMALFENCE),
        (this.properties.plotName = '普通围栏'),
        (this.style.fenceHeight = _this.style.fenceHeight || 20),
        (this.style.color = _this.style.color || '#FF0000'),
        this.createEntity(),
        (this.minPositionCount = 2);
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.GeoPlot.GeoPlotBase),
      (e.prototype.getStyle = function () {
        return this.style;
      }),
      (e.prototype.updateStyle = function () {
        this.initHeights(), (this.fenceEntity.wall.material.color = Cesium.Color.fromCssColorString(this.style.color));
      }),
      (e.prototype.setStyle = function (e) {
        (this.style = e),
          this.initHeights(),
          (this.fenceEntity.wall.material.color = Cesium.Color.fromCssColorString(this.style.color));
      }),
      (e.prototype.setPositions = function (e) {
        var t = this;
        (this.positions = e || []),
          (this.coordinates = []),
          this.positions.forEach(function (e) {
            (e = Cesium.Cartographic.fromCartesian(e)),
              (e = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height]);
            t.coordinates.push(e);
          }),
          this.initHeights();
      }),
      (e.prototype.initHeights = function () {
        var t = [];
        this.positions.forEach(function (e) {
          e = Cesium.Cartographic.fromCartesian(e);
          t.push(e.height);
        });
        for (var e = [], i = [], o = 0; o < t.length; o++) e.push(t[o] + this.style.fenceHeight), i.push(t[o]);
        (this.minimumHeights = t), (this.maximumHeights = e), (this.dayMaximumHeights = i);
      }),
      (e.prototype.createEntity = function () {
        this.initHeights(), this.initFence();
      }),
      (e.prototype.initFence = function () {
        var t = this;
        this.fenceEntity = this.viewer.entities.add({
          plotType: this.properties.plotBase,
          plotCode: this.properties.plotCode,
          wall: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.positions;
            }, !1),
            minimumHeights: new Cesium.CallbackProperty(function (e) {
              return t.minimumHeights;
            }, !1),
            maximumHeights: new Cesium.CallbackProperty(function (e) {
              return t.maximumHeights;
            }, !1),
            material: new Cesium.ImageMaterialProperty({
              image: '../../../static/images/effects/fence1.png',
              transparent: !0,
              color: Cesium.Color.fromCssColorString(this.style.color),
            }),
          },
        });
      }),
      (e.prototype.setSelected = function (e) {
        var t = this;
        this.fenceEntity.polyline = e
          ? {
              positions: new Cesium.CallbackProperty(function (e) {
                return t.positions;
              }, !1),
              width: 2,
              clampToGround: !1,
              material: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
              depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
            }
          : { positions: [], width: 0 };
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'LineString', coordinates: this.coordinates },
        };
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.fenceEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.DynamicFence = function (e, t) {
      TMap3D.GeoPlot.NormalFence.call(this, e, t),
        (this.properties.plotType = TMap3D.GeoPlot_PlotTypes.DYNAMICFENCE),
        (this.properties.plotName = '动态围栏');
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.GeoPlot.NormalFence),
      (e.prototype.createEntity = function () {
        this.initHeights(), this.initFence(), this.initFence1();
      }),
      (e.prototype.initFence1 = function () {
        var t = this;
        this.flipFenceEntity = this.viewer.entities.add({
          plotType: 'GeoPlot',
          plotCode: this.properties.plotCode,
          wall: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.positions;
            }, !1),
            minimumHeights: new Cesium.CallbackProperty(function (e) {
              return t.minimumHeights;
            }, !1),
            maximumHeights: new Cesium.CallbackProperty(function (e) {
              return t.generateDayMaximumHeights(), t.dayMaximumHeights || [];
            }, !1),
            material: new Cesium.ImageMaterialProperty({
              image: TMap3D.BaseUtils.getHostPath() + '/TMap/effects/fenceFlip1.png',
              transparent: !0,
              color: Cesium.Color.fromCssColorString(this.style.color),
            }),
          },
        });
      }),
      (e.prototype.updateStyle = function () {
        this.initHeights(),
          (this.fenceEntity.wall.material.color = Cesium.Color.fromCssColorString(this.style.color)),
          (this.flipFenceEntity.wall.material.color = Cesium.Color.fromCssColorString(this.style.color));
      }),
      (e.prototype.generateDayMaximumHeights = function () {
        for (var e = 0; e < this.minimumHeights.length; e++)
          (this.dayMaximumHeights[e] += 0.004 * this.style.fenceHeight),
            this.dayMaximumHeights[e] > this.maximumHeights[e] && (this.dayMaximumHeights[e] = this.minimumHeights[e]);
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.fenceEntity), this.viewer.entities.remove(this.flipFenceEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.Polygon = function (e, t) {
      TMap3D.GeoPlot.GeoPlotBase.call(this, e, t),
        (this.properties.plotName = '面'),
        (this.properties.plotType = TMap3D.GeoPlot_PlotTypes.POLYGON),
        (this.minPositionCount = 3),
        this.createEntity();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.GeoPlot.GeoPlotBase),
      (e.prototype.createEntity = function () {
        this.polygonEntity = this.viewer.entities.add({
          plotType: 'GeoPlot',
          plotCode: this.properties.plotCode,
          polygon: { hierarchy: this.positions, material: Cesium.Color.RED.withAlpha(0.5), perPositionHeight: !0 },
        });
      }),
      (e.prototype.openEditMode = function (e) {
        var t = this;
        e
          ? ((this.polygonEntity.polygon = {
              hierarchy: new Cesium.CallbackProperty(function (e) {
                return new Cesium.PolygonHierarchy(t.positions);
              }, !1),
              material: Cesium.Color.RED.withAlpha(0.5),
              perPositionHeight: !0,
            }),
            (this.polygonEntity.polyline = {
              positions: new Cesium.CallbackProperty(function (e) {
                return t.positions.concat(t.positions[0]);
              }, !1),
              width: 1,
              material: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
              depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
            }))
          : ((this.polygonEntity.polygon.hierarchy = this.positions),
            (this.polygonEntity.polyline = {
              positions: new Cesium.CallbackProperty(function (e) {
                return t.positions.concat(t.positions[0]);
              }, !1),
              width: 0,
            }));
      }),
      (e.prototype.setSelected = function (e) {
        var t = this;
        this.polygonEntity.polyline = e
          ? {
              positions: new Cesium.CallbackProperty(function (e) {
                return t.positions.concat(t.positions[0]);
              }, !1),
              width: 1,
              material: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
              depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
            }
          : {
              positions: new Cesium.CallbackProperty(function (e) {
                return t.positions.concat(t.positions[0]);
              }, !1),
              width: 0,
            };
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'Polygon', coordinates: this.coordinates },
        };
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.polygonEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.Polyline = function (e, t) {
      TMap3D.GeoPlot.GeoPlotBase.call(this, e, t),
        (this.properties.plotName = '线'),
        (this.properties.plotType = TMap3D.GeoPlot_PlotTypes.POLYLINE),
        (this.minPositionCount = 2),
        this.createEntity();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.GeoPlot.GeoPlotBase),
      (e.prototype.createEntity = function () {
        this.polylineEntity = this.viewer.entities.add({
          plotType: 'GeoPlot',
          plotCode: this.properties.plotCode,
          polyline: {
            positions: this.positions,
            width: 2,
            material: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.RED }),
            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.RED }),
          },
        });
      }),
      (e.prototype.openEditMode = function (e) {
        var t = this;
        this.polylineEntity.polyline.positions = e
          ? new Cesium.CallbackProperty(function (e) {
              return t.positions;
            }, !1)
          : this.positions;
      }),
      (e.prototype.setSelected = function (e) {
        e
          ? ((this.polylineEntity.polyline.material = new Cesium.PolylineDashMaterialProperty({
              color: Cesium.Color.YELLOW,
            })),
            (this.polylineEntity.polyline.depthFailMaterial = new Cesium.PolylineDashMaterialProperty({
              color: Cesium.Color.YELLOW,
            })))
          : ((this.polylineEntity.polyline.material = Cesium.Color.RED.withAlpha(0.5)),
            (this.polylineEntity.polyline.depthFailMaterial = Cesium.Color.RED.withAlpha(0.5)));
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'LineString', coordinates: this.coordinates },
        };
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.polylineEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.PolylineVolume = function (e, t, i) {
      TMap3D.GeoPlot.GeoPlotBase.call(this, e, t),
        (this.properties = TMap3D.BaseUtils.extend(t.properties, i)),
        (this.properties.plotName = TMap3D.GeoPlot_PlotTypes.POLYLINEVOLUME),
        (this.properties.height = this.properties.height || 5),
        (this.properties.width = this.properties.width || 0.1),
        (this.minPositionCount = 2),
        this.createEntity();
    });
    (e.prototype.createEntity = function () {
      var e = this.properties.material || Cesium.Color.RED.withAlpha(0.6);
      this.polylineVolumeEntity = this.viewer.entities.add({
        plotType: 'GeoPlot',
        plotCode: this.properties.plotCode,
        polylineVolume: {
          positions: this.positions,
          shape: [
            new Cesium.Cartesian2(-this.properties.width / 2, -this.properties.height / 2),
            new Cesium.Cartesian2(this.properties.width / 2, -this.properties.height / 2),
            new Cesium.Cartesian2(this.properties.width / 2, this.properties.height / 2),
            new Cesium.Cartesian2(-this.properties.width / 2, this.properties.height / 2),
          ],
          cornerType: Cesium.CornerType.BEVELED,
          material: e,
        },
      });
    }),
      (e.prototype.setMaterial = function (e) {
        e && ((this.polylineVolumeEntity.material = e), (this.properties.material = e));
      }),
      (e.prototype.openEditMode = function (e) {
        var t = this;
        this.polylineVolumeEntity.polylineVolume.positions = e
          ? new Cesium.CallbackProperty(function (e) {
              return t.positions;
            }, !1)
          : this.positions;
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.polylineVolumeEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.GeoPlot.Rectangle = function (e, t) {
      TMap3D.GeoPlot.GeoPlotBase.call(this, e, t),
        (this.properties.plotName = '矩形'),
        (this.properties.plotType = TMap3D.GeoPlot_PlotTypes.RECTANGLE),
        (this.fixPositionCount = 2),
        this.createEntity();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.GeoPlot.GeoPlotBase),
      (e.prototype.updatePositionAction = function () {
        TMap3D.Utils.MapUtils.unifiedHeight(this.positions);
      }),
      (e.prototype.createEntity = function () {
        this.polygonEntity = this.viewer.entities.add({
          plotType: 'GeoPlot',
          plotCode: this.properties.plotCode,
          polygon: {
            hierarchy: this.getRectanglePositions(),
            material: Cesium.Color.RED.withAlpha(0.6),
            perPositionHeight: !0,
          },
        });
      }),
      (e.prototype.getRectanglePositions = function () {
        var e = this.positions[0],
          t = this.positions[0];
        1 < this.positions.length && (t = this.positions[1]);
        (e = Cesium.Cartographic.fromCartesian(e)), (t = Cesium.Cartographic.fromCartesian(t));
        e.height < 0 && (e.height = 0), t.height < 0 && (t.height = 0);
        (t = this.getRectanglePointsByTwoPoint(e, t)),
          (e = [
            t[0][0],
            t[0][1],
            e.height,
            t[1][0],
            t[1][1],
            e.height,
            t[2][0],
            t[2][1],
            e.height,
            t[3][0],
            t[3][1],
            e.height,
            t[0][0],
            t[0][1],
            e.height,
          ]);
        return new Cesium.PolygonHierarchy(Cesium.Cartesian3.fromDegreesArrayHeights(e));
      }),
      (e.prototype.getRectanglePointsByTwoPoint = function (e, t) {
        var i = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude)],
          o = [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(t.latitude)];
        return [
          i,
          [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(t.latitude)],
          o,
          [Cesium.Math.toDegrees(t.longitude), Cesium.Math.toDegrees(e.latitude)],
        ];
      }),
      (e.prototype.openEditMode = function (e) {
        var t = this;
        this.polygonEntity.polygon.hierarchy = e
          ? new Cesium.CallbackProperty(function (e) {
              return t.getRectanglePositions();
            }, !1)
          : this.getRectanglePositions();
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'LineString', coordinates: this.coordinates },
        };
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.polygonEntity);
      });
  })(),
  (TMap3D.GeoPlot.PlotFactory = {
    createPlot: function (e, t, i) {
      switch (t) {
        case TMap3D.GeoPlot_PlotTypes.POLYGON:
          return new TMap3D.GeoPlot.Polygon(e, i);
        case TMap3D.GeoPlot_PlotTypes.MARKER:
          return new TMap3D.GeoPlot.Marker(e, i);
        case TMap3D.GeoPlot_PlotTypes.TEXT:
          return new TMap3D.GeoPlot.TextMarker(e, i);
        case TMap3D.GeoPlot_PlotTypes.POLYLINE:
          return new TMap3D.GeoPlot.Polyline(e, i);
        case TMap3D.GeoPlot_PlotTypes.CIRCLE:
          return new TMap3D.GeoPlot.Circle(e, i);
        case TMap3D.GeoPlot_PlotTypes.RECTANGLE:
          return new TMap3D.GeoPlot.Rectangle(e, i);
        case TMap3D.GeoPlot_PlotTypes.NORMALFENCE:
          return new TMap3D.GeoPlot.NormalFence(e, i);
        case TMap3D.GeoPlot_PlotTypes.DYNAMICFENCE:
          return new TMap3D.GeoPlot.DynamicFence(e, i);
        case TMap3D.GeoPlot_PlotTypes.CORRIDOR:
          return new TMap3D.GeoPlot.Corridor(e, i);
        case TMap3D.GeoPlot_PlotTypes.POLYLINEVOLUME:
          return new TMap3D.GeoPlot.PolylineVolume(e, i);
      }
    },
  }),
  (function () {
    var e = (TMap3D.Symbols.Label3D = function (e, t, i) {
      (this.viewer = e), (this.position = t), (this.label = i), this.initDom(), this.initEvent();
    });
    (e.prototype.initDom = function () {
      (this.$htmlContainer = document.createElement('div')),
        this.$htmlContainer.classList.add('label3d-container'),
        (this.$htmlContainer.innerHTML = this.label),
        this.viewer.cesiumWidget.container.appendChild(this.$htmlContainer),
        this.viewer.scene.postRender.addEventListener(this.postRenderEvent, this);
    }),
      (e.prototype.initEvent = function () {
        this.viewer.scene.postRender.addEventListener(this.postRenderEventHandle, this);
      }),
      (e.prototype.postRenderEventHandle = function () {
        var e = this.viewer.scene.canvas.height,
          t = new Cesium.Cartesian2();
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(this.viewer.scene, this.position, t),
          (this.$htmlContainer.style.bottom = e - t.y + 10 + 'px');
        e = this.$htmlContainer.offsetWidth;
        this.$htmlContainer.style.left = t.x - e / 2 + 'px';
        (t = this.viewer.camera.position), (e = this.viewer.scene.globe.ellipsoid.cartesianToCartographic(t).height);
        (e += this.viewer.scene.globe.ellipsoid.maximumRadius),
          Cesium.Cartesian3.distance(t, this.position) > e
            ? (this.$htmlContainer.style.display = 'none')
            : (this.$htmlContainer.style.display = 'block');
      }),
      (e.prototype.remove = function () {
        this.viewer.scene.postRender.removeEventListener(this.postRenderEventHandle, this);
      });
  })(),
  (function () {
    var e = (TMap3D.Symbols.StatisticalChart = function (e, t, i) {
      (this.viewer = e),
        (this.chartEntities = []),
        (this.events = i.events),
        (this.defaultStyle = {
          outline: !1,
          fill: !0,
          radius: 2e3,
          slices: 2 < i.slices ? i.slices : 60,
          maxHeight: 2e4,
          ...i,
        }),
        this.updateEntity(t);
    });
    (e.prototype.updateEntity = function (e, t) {
      Array.isArray(e) &&
        (t instanceof Object && this.updateStyle(t),
        this.dataset?.length && this.defaultStyle.animation
          ? this.updateHeight('down', () => {
              this.removeAll(), this.unRegisterMouseEvents(), this.addCylinderEntities(e);
            })
          : (this.removeAll(), this.unRegisterMouseEvents(), this.addCylinderEntities(e)));
    }),
      (e.prototype.addCylinderEntities = function (e) {
        const a = this.calcHeightRate(e);
        (this.dataset = e.map((o, n) => {
          let r = Cesium.clone(o, !0),
            s = 0;
          return (
            (r.entities = []),
            (r.valueArr = []),
            (r.baseHeightArr = []),
            Object.keys(r.dataset).forEach((e) => {
              0 < this.defaultStyle.maxHeight && (r.dataset[e] = r.dataset[e] * a),
                r.valueArr.push(r.dataset[e]),
                r.baseHeightArr.push(s + r.dataset[e] / 2);
              let t = this._formateData(r, e, 0, a);
              (t.type = 'chart'), (t.data = o), (t.key = e), (t.group = `chart_${n}`), (t.dataHeight = r.dataset[e]);
              e = r.dataset[e];
              s += e;
              let i = this.viewer.entities.add(t);
              (i.currentLength = 0),
                (i.currentPosition = Cesium.Cartesian3.fromDegrees(o.position[0], o.position[1], o.position[2] || 0)),
                (i.cylinder.length = new Cesium.CallbackProperty(() => i.currentLength)),
                (i.position = new Cesium.CallbackProperty(() => i.currentPosition)),
                r.entities.push(i),
                this.chartEntities.push(i);
            }),
            r.entities.forEach((e) => {
              e.dataHeightSum = r.valueArr.reduce((e, t) => e + t);
            }),
            r
          );
        })),
          this.updateHeight('up', () => {
            this.events && this.registerMouseEvents();
          });
      }),
      (e.prototype.updateStyle = function (e) {
        this.defaultStyle = { ...this.defaultStyle, ...e };
      }),
      (e.prototype.calcHeightRate = function (e) {
        let t = 0;
        return (
          e.map((e) => {
            e = Object.values(e.dataset).reduce((e, t) => e + t);
            t < e && (t = e);
          }),
          this.defaultStyle.maxHeight / t
        );
      }),
      (e.prototype._formateData = function (e, t, i, o) {
        let n = {},
          r = e.dataset[t];
        return (
          0 < this.defaultStyle.maxHeight && (r = e.dataset[t] * o),
          (n.position = Cesium.Cartesian3.fromDegrees(e.position[0], e.position[1], (e.position[2] || 0) + r / 2 + i)),
          (n.cylinder = this._formateStyle(this.defaultStyle, r, t)),
          n
        );
      }),
      (e.prototype._formateStyle = function (e, t, i) {
        let o = { length: t, ...e };
        return (
          e.radius && (o.topRadius = o.bottomRadius = e.radius),
          !e.legend ||
            '[object Object]' !== Object.prototype.toString.call(e.legend) ||
            ((i = e.legend[i]) && (o.material = Cesium.Color.fromCssColorString(i))),
          o
        );
      }),
      (e.prototype.updateHeight = function (t, i) {
        var n = 'up' === t ? 0 : 90,
          r = null,
          s = this;
        !(function e() {
          const o = Math.sin((n / 180) * Math.PI);
          if (('up' === t ? (n += 3) : (n -= 3), ('up' === t && 90 < n) || ('down' === t && n < 0)))
            return r && cancelAnimationFrame(r), (r = null), void (i && i());
          s.dataset.forEach((i) => {
            i.entities.forEach((e, t) => {
              (e.currentLength = i.valueArr[t] * o),
                (e.currentPosition = Cesium.Cartesian3.fromDegrees(
                  i.position[0],
                  i.position[1],
                  (i.position[2] || 0) + i.baseHeightArr[t] * o,
                ));
            });
          }),
            (r = window.requestAnimationFrame(e));
        })();
      }),
      (e.prototype.setMaterial = function (t) {
        t &&
          this.chartEntities.forEach((e) => {
            e.material = t;
          });
      }),
      (e.prototype.removeAll = function () {
        this.chartEntities.forEach((e) => {
          this.viewer.entities.remove(e);
        }),
          (this.chartEntities = []);
      }),
      (e.prototype.registerMouseEvents = function () {
        if (
          ((this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
          this.eventHandler.setInputAction((e) => {
            var t;
            this.events.click &&
              this.events.click instanceof Function &&
              'chart' === (t = this.viewer.scene.pick(e.position))?.id?.type &&
              this.events.click({
                position: this.viewer.scene.pickPosition(e.position),
                dataKey: t?.id?.key,
                data: t?.id?.data,
                dataHeight: t?.id?.dataHeight,
                dataHeightSum: t?.id?.dataHeightSum,
              });
          }, Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.events.mouseOver && this.events.mouseOver instanceof Function)
        ) {
          let o = [],
            n = null;
          this.eventHandler.setInputAction((e) => {
            let t = this.viewer.scene.pick(e.endPosition);
            var i = t?.id?.data;
            null !== n &&
              n !== i &&
              (o.forEach((e) => {
                let t = e.cylinder.material.color.getValue();
                (t.alpha = e.cylinder.material._zpAlpha), e.cylinder.material.color.setValue(t);
              }),
              (o = []),
              (n = null),
              this.events.mouseOut &&
                this.events.mouseOut instanceof Function &&
                this.events.mouseOut({
                  position: this.viewer.scene.pickPosition(e.endPosition),
                  dataKey: t?.id?.key,
                  data: t?.id?.data,
                  dataHeight: t?.id?.dataHeight,
                  dataHeightSum: t?.id?.dataHeightSum,
                })),
              'chart' === t?.id?.type &&
                ((null !== n && n === i) ||
                  ((n = i),
                  (o = this.chartEntities.filter((e) => e.group === t?.id?.group)),
                  o.forEach((e) => {
                    let t = e.cylinder.material.color.getValue();
                    (e.cylinder.material._zpAlpha = t.alpha), (t.alpha = 0.8), e.cylinder.material.color.setValue(t);
                  }),
                  this.events.mouseOver({
                    position: this.viewer.scene.pickPosition(e.endPosition),
                    dataKey: t?.id?.key,
                    data: t?.id?.data,
                    dataHeight: t?.id?.dataHeight,
                    dataHeightSum: t?.id?.dataHeightSum,
                  })));
          }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }
      }),
      (e.prototype.unRegisterMouseEvents = function () {
        this.events &&
          this.eventHandler &&
          (this.events.click && this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          (this.events.mouseOver || this.events.mouseOut) &&
            this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
          (this.eventHandler = null));
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.MilitaryPlotBase = function (e, t) {
      (this.viewer = e),
        (this.properties = t.properties),
        (this.properties.plotBase = 'MilitaryPlot'),
        (this.coordinates = t.geometry.coordinates),
        (this.style = this.properties.style),
        this.initConsts(),
        this.setPoints(this.coordinates[0]);
    });
    (e.prototype.initConsts = function () {}),
      (e.prototype.openEditMode = function (e) {}),
      (e.prototype.setHeight = function (e) {
        this.style.height = e;
      }),
      (e.prototype.getHeight = function () {
        return this.style.height;
      }),
      (e.prototype.setPoints = function (e) {
        (this.coordinates[0] = e || []), 1 <= this.coordinates[0].length && this.generate();
      }),
      (e.prototype.getPoints = function () {
        return this.coordinates[0].slice(0);
      }),
      (e.prototype.getPointCount = function () {
        return this.coordinates[0].length;
      }),
      (e.prototype.generate = function () {}),
      (e.prototype.generatePositions = function (e) {
        this.positions = TMap3D.Utils.MapUtils.poin2dsToPoint3ds(e, this.getHeight());
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.Marker = function () {
      TMap3D.MilitaryPlot.MilitaryPlotBase.call(this, viewer, geoFeature),
        (this.properties.plotType = TMap3D.Military_PlotTypes.MARKER),
        (this.properties.plotName = 'Marker'),
        this.generateEntity(),
        (this.fixPointCount = 1);
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.MilitaryPlotBase),
      (e.prototype.generateEntity = function () {
        var t = this;
        this.markerEntity = this.viewer.entities.add({
          plotType: this.properties.plotBase,
          plotCode: this.properties.plotCode,
          position: new Cesium.CallbackProperty(function (e) {
            return t.positions[0];
          }, !1),
          billboard: {
            image: TMap3D.BaseUtils.getHostPath() + '/TMap/Plot/location.png',
            scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          },
        });
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'Point', coordinates: this.coordinates },
        };
      }),
      (e.prototype.generate = function () {
        this.getPointCount() < 1 || this.generatePositions(this.coordinates[0]);
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.markerEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.Polyline = function () {
      TMap3D.MilitaryPlot.MilitaryPlotBase.call(this, viewer, geoFeature),
        (this.properties.plotType = TMap3D.Military_PlotTypes.POLYLINE),
        (this.properties.plotName = 'Polyline'),
        (this.minPointCount = 2),
        this.generateEntity();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.MilitaryPlotBase),
      (e.prototype.generateEntity = function () {
        var t = this;
        this.lineEntity = this.viewer.entities.add({
          plotType: 'MilitaryPlot',
          plotCode: this.baseInfo.plotCode,
          polyline: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.positions;
            }, !1),
          },
        });
      }),
      (e.prototype.generate = function () {
        this.getPointCount() < 2 || this.generatePositions(this.points);
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.lineEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.Polygon = function (e, t) {
      TMap3D.MilitaryPlot.MilitaryPlotBase.call(this, e, t),
        (this.properties.plotType = TMap3D.Military_PlotTypes.POLYGON),
        (this.properties.plotName = '面'),
        this.generateEntity(),
        (this.minPointCount = 3);
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.MilitaryPlotBase),
      (e.prototype.generateEntity = function () {
        this.polygonEntity = this.viewer.entities.add({
          plotType: this.properties.plotBase,
          plotCode: this.properties.plotCode,
          polygon: {
            hierarchy: new Cesium.PolygonHierarchy(this.positions || []),
            material: Cesium.Color.RED.withAlpha(0.6),
            classificationType: Cesium.ClassificationType.BOTH,
          },
        });
      }),
      (e.prototype.setSelected = function (e) {
        this.polygonEntity.polygon.material = e ? Cesium.Color.RED.withAlpha(0.8) : Cesium.Color.YELLOW.withAlpha(0.6);
      }),
      (e.prototype.generate = function () {
        this.getPointCount() < 2 || this.generatePositions(this.coordinates[0]);
      }),
      (e.prototype.openEditMode = function (e) {
        var t = this;
        e
          ? ((this.polygonEntity.polygon.hierarchy = new Cesium.CallbackProperty(function (e) {
              return new Cesium.PolygonHierarchy(t.positions || []);
            }, !1)),
            (this.polygonEntity.polyline = {
              positions: new Cesium.CallbackProperty(function (e) {
                return t.positions && 0 < t.positions.length ? t.positions.concat(t.positions[0]) : [];
              }, !1),
              width: 2,
              clampToGround: !0,
              material: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
              depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
            }))
          : ((this.polygonEntity.polygon.hierarchy = new Cesium.PolygonHierarchy(this.positions || [])),
            this.polygonEntity.polyline && (this.polygonEntity.polyline.width = 0));
      }),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'Polygon', coordinates: this.coordinates },
        };
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.polygonEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.Circle = function (e, t) {
      TMap3D.MilitaryPlot.Polygon.call(this, e, t),
        (this.properties.plotType = TMap3D.Military_PlotTypes.CIRCLE),
        (this.properties.plotName = '正圆'),
        (this.fixPointCount = 2);
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.Polygon),
      (e.prototype.generate = function () {
        var e, t;
        this.getPointCount() < 2 ||
          ((e = this.coordinates[0][0]),
          (t = this.distance(e, this.coordinates[0][1])),
          this.generatePositions(this.generateCirclePoints(e, t)));
      }),
      (e.prototype.distance = function (e, t) {
        var i = (e[1] * Math.PI) / 180,
          o = (t[1] * Math.PI) / 180,
          t = (e[0] * Math.PI) / 180 - (t[0] * Math.PI) / 180,
          t =
            2 *
            Math.asin(
              Math.sqrt(Math.pow(Math.sin((i - o) / 2), 2) + Math.cos(i) * Math.cos(o) * Math.pow(Math.sin(t / 2), 2)),
            );
        return (t *= 6378.137), (t = Math.round(1e4 * t) / 10);
      }),
      (e.prototype.generateCirclePoints = function (e, t) {
        for (var i = [], o = 0; o < 360; o += 2) i.push(this.getCirclePoint(e[0], e[1], o, t));
        return i;
      }),
      (e.prototype.getCirclePoint = function (e, t, i, o) {
        var n = o * Math.sin((i * Math.PI) / 180),
          o = o * Math.cos((i * Math.PI) / 180),
          i =
            TMap3D.Utils.NormalUtils.PRADIUS +
            ((TMap3D.Utils.NormalUtils.ERADIUS - TMap3D.Utils.NormalUtils.PRADIUS) * (90 - t)) / 90;
        return [
          (180 * (n / (i * Math.cos((t * Math.PI) / 180)) + (e * Math.PI) / 180)) / Math.PI,
          (180 * (o / i + (t * Math.PI) / 180)) / Math.PI,
        ];
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.Ellipse = function (e, t) {
      TMap3D.MilitaryPlot.Polygon.call(this, e, t),
        (this.properties.plotType = TMap3D.Military_PlotTypes.ELLIPSE),
        (this.properties.plotName = '椭圆');
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.Polygon),
      (e.prototype.initConsts = function () {
        this.fixPointCount = 2;
      }),
      (e.prototype.generate = function () {
        var e, t, i, o;
        this.getPointCount() < 2 ||
          ((e = this.coordinates[0][0]),
          (o = this.coordinates[0][1]),
          (t = TMap3D.Utils.NormalUtils.mid(e, o)),
          (i = Math.abs((e[0] - o[0]) / 2)),
          (o = Math.abs((e[1] - o[1]) / 2)),
          this.generatePositions(this.generatePoints(t, i, o)));
      }),
      (e.prototype.generatePoints = function (e, t, i) {
        for (var o, n, r = [], s = 0; s <= TMap3D.Utils.NormalUtils.FITTING_COUNT; s++)
          (n = (2 * Math.PI * s) / TMap3D.Utils.NormalUtils.FITTING_COUNT),
            (o = e[0] + t * Math.cos(n)),
            (n = e[1] + i * Math.sin(n)),
            r.push([o, n]);
        return r;
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.Sector = function (e, t) {
      TMap3D.MilitaryPlot.Polygon.call(this, e, t),
        (this.properties.plotType = TMap3D.Military_PlotTypes.SECTOR),
        (this.properties.plotName = '扇形');
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.Polygon),
      (e.prototype.initConsts = function () {
        this.fixPointCount = 3;
      }),
      (e.prototype.generate = function () {
        var e, t, i, o;
        this.getPointCount() < 2 ||
          (2 == this.getPointCount()
            ? this.generatePositions(this.coordinates[0])
            : ((e = (t = this.getPoints())[0]),
              (i = t[1]),
              (o = t[2]),
              TMap3D.Utils.NormalUtils.distance(i, e),
              (t = (180 * TMap3D.Utils.NormalUtils.getAzimuth(i, e)) / 3.14),
              (o = (180 * TMap3D.Utils.NormalUtils.getAzimuth(o, e)) / 3.14),
              (i = this.distance(i, e)),
              (o = this.generatSectorPoints(e, i, t, o)).push(e, o[0]),
              this.generatePositions(o)));
      }),
      (e.prototype.distance = function (e, t) {
        var i = (e[1] * Math.PI) / 180,
          o = (t[1] * Math.PI) / 180,
          t = (e[0] * Math.PI) / 180 - (t[0] * Math.PI) / 180,
          t =
            2 *
            Math.asin(
              Math.sqrt(Math.pow(Math.sin((i - o) / 2), 2) + Math.cos(i) * Math.cos(o) * Math.pow(Math.sin(t / 2), 2)),
            );
        return (t *= 6378.137), (t = Math.round(1e4 * t) / 10);
      }),
      (e.prototype.generatSectorPoints = function (e, t, i, o) {
        var n = [];
        if ((i = 90 - i) < (o = 90 - o)) for (var r = i; r < o; r += 2) n.push(this.getCirclePoint(e[0], e[1], r, t));
        else for (var s = i; o < s; s -= 2) n.push(this.getCirclePoint(e[0], e[1], s, t));
        return n;
      }),
      (e.prototype.getCirclePoint = function (e, t, i, o) {
        var n = o * Math.sin((i * Math.PI) / 180),
          o = o * Math.cos((i * Math.PI) / 180),
          i =
            TMap3D.Utils.NormalUtils.PRADIUS +
            TMap3D.Utils.NormalUtils.ERADIUS -
            (TMap3D.Utils.NormalUtils.PRADIUS * (90 - t)) / 90;
        return [
          (180 * (n / (i * Math.cos((t * Math.PI) / 180)) + (e * Math.PI) / 180)) / Math.PI,
          (180 * (o / i + (t * Math.PI) / 180)) / Math.PI,
        ];
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.Rectangle = function (e, t) {
      TMap3D.MilitaryPlot.Polygon.call(this, e, t),
        (this.properties.plotType = TMap3D.Military_PlotTypes.RECTANGLE),
        (this.properties.plotName = '矩形');
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.Polygon),
      (e.prototype.initConsts = function () {
        this.fixPointCount = 2;
      }),
      (e.prototype.generate = function () {
        var e, t, i, o, n;
        this.getPointCount() < 2 ||
          ((e = this.coordinates[0][0]),
          (n = this.coordinates[0][1]),
          (t = Math.min(e[0], n[0])),
          (i = Math.max(e[0], n[0])),
          (o = Math.min(e[1], n[1])),
          (n = Math.max(e[1], n[1])),
          this.generatePositions([
            [t, n],
            [i, n],
            [i, o],
            [t, o],
          ]));
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.FineArrow = function (e, t) {
      TMap3D.MilitaryPlot.Polygon.call(this, e, t),
        (this.properties.plotType = TMap3D.Military_PlotTypes.FINE_ARROW),
        (this.properties.plotName = '直箭头');
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.Polygon),
      (e.prototype.initConsts = function () {
        (this.tailWidthFactor = 0.1),
          (this.neckWidthFactor = 0.2),
          (this.headWidthFactor = 0.25),
          (this.headAngle = Math.PI / 8.5),
          (this.neckAngle = Math.PI / 13),
          (this.fixPointCount = 2);
      }),
      (e.prototype.generate = function () {
        var e, t, i, o, n, r, s, a;
        this.getPointCount() < 2 ||
          ((e = (o = this.getPoints())[0]),
          (t = o[1]),
          (r = (n = TMap3D.Utils.NormalUtils.getBaseLength(o)) * this.tailWidthFactor),
          (a = n * this.neckWidthFactor),
          (s = n * this.headWidthFactor),
          (i = TMap3D.Utils.NormalUtils.getThirdPoint(t, e, TMap3D.Utils.NormalUtils.HALF_PI, r, !0)),
          (o = TMap3D.Utils.NormalUtils.getThirdPoint(t, e, TMap3D.Utils.NormalUtils.HALF_PI, r, !1)),
          (n = TMap3D.Utils.NormalUtils.getThirdPoint(e, t, this.headAngle, s, !1)),
          (r = TMap3D.Utils.NormalUtils.getThirdPoint(e, t, this.headAngle, s, !0)),
          (s = TMap3D.Utils.NormalUtils.getThirdPoint(e, t, this.neckAngle, a, !1)),
          (a = TMap3D.Utils.NormalUtils.getThirdPoint(e, t, this.neckAngle, a, !0)),
          this.generatePositions([i, s, n, t, r, a, o]));
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.AttackArrow = function (e, t) {
      TMap3D.MilitaryPlot.Polygon.call(this, e, t),
        (this.properties.plotType = TMap3D.Military_PlotTypes.ATTACK_ARROW),
        (this.properties.plotName = '进攻方向');
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.Polygon),
      (e.prototype.initConsts = function () {
        (this.headHeightFactor = 0.18),
          (this.headWidthFactor = 0.3),
          (this.neckHeightFactor = 0.85),
          (this.neckWidthFactor = 0.15),
          (this.headTailFactor = 0.8);
      }),
      (e.prototype.generate = function () {
        var e, t, i, o, n, r, s;
        this.getPointCount() < 2 ||
          (2 != this.getPointCount()
            ? ((r = (s = this.getPoints())[0]),
              (e = s[1]),
              TMap3D.Utils.NormalUtils.isClockWise(s[0], s[1], s[2]) && ((r = s[1]), (e = s[0])),
              (n = [TMap3D.Utils.NormalUtils.mid(r, e)].concat(s.slice(2))),
              (i = (t = this.getArrowHeadPoints(n, r, e))[0]),
              (o = t[4]),
              (s = TMap3D.Utils.NormalUtils.distance(r, e) / TMap3D.Utils.NormalUtils.getBaseLength(n)),
              (s = (n = this.getArrowBodyPoints(n, i, o, s)).length),
              (r = [r].concat(n.slice(0, s / 2))).push(i),
              (s = [e].concat(n.slice(s / 2, s))).push(o),
              (r = TMap3D.Utils.NormalUtils.getQBSplinePoints(r)),
              (s = TMap3D.Utils.NormalUtils.getQBSplinePoints(s)),
              this.generatePositions(r.concat(t, s.reverse())))
            : this.generatePositions(this.coordinates[0]));
      }),
      (e.prototype.getArrowHeadPoints = function (e, t, i) {
        var o = (r = TMap3D.Utils.NormalUtils.getBaseLength(e)) * this.headHeightFactor,
          n = e[e.length - 1],
          r = TMap3D.Utils.NormalUtils.distance(n, e[e.length - 2]),
          t = TMap3D.Utils.NormalUtils.distance(t, i),
          i = (o = o > t * this.headTailFactor ? t * this.headTailFactor : o) * this.headWidthFactor,
          t = o * this.neckWidthFactor,
          r = (o = r < o ? r : o) * this.neckHeightFactor,
          o = TMap3D.Utils.NormalUtils.getThirdPoint(e[e.length - 2], n, 0, o, !0),
          e = TMap3D.Utils.NormalUtils.getThirdPoint(e[e.length - 2], n, 0, r, !0),
          r = TMap3D.Utils.NormalUtils.getThirdPoint(n, o, TMap3D.Utils.NormalUtils.HALF_PI, i, !1),
          i = TMap3D.Utils.NormalUtils.getThirdPoint(n, o, TMap3D.Utils.NormalUtils.HALF_PI, i, !0);
        return [
          TMap3D.Utils.NormalUtils.getThirdPoint(n, e, TMap3D.Utils.NormalUtils.HALF_PI, t, !1),
          r,
          n,
          i,
          TMap3D.Utils.NormalUtils.getThirdPoint(n, e, TMap3D.Utils.NormalUtils.HALF_PI, t, !0),
        ];
      }),
      (e.prototype.getArrowBodyPoints = function (e, t, i, o) {
        for (
          var n = TMap3D.Utils.NormalUtils.wholeDistance(e),
            r = TMap3D.Utils.NormalUtils.getBaseLength(e) * o,
            s = (r - TMap3D.Utils.NormalUtils.distance(t, i)) / 2,
            a = 0,
            l = [],
            h = [],
            u = 1;
          u < e.length - 1;
          u++
        ) {
          var c = TMap3D.Utils.NormalUtils.getAngleOfThreePoints(e[u - 1], e[u], e[u + 1]) / 2,
            p = (r / 2 - ((a += TMap3D.Utils.NormalUtils.distance(e[u - 1], e[u])) / n) * s) / Math.sin(c),
            d = TMap3D.Utils.NormalUtils.getThirdPoint(e[u - 1], e[u], Math.PI - c, p, !0),
            p = TMap3D.Utils.NormalUtils.getThirdPoint(e[u - 1], e[u], c, p, !1);
          l.push(d), h.push(p);
        }
        return l.concat(h);
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.AssaultDirection = function (e, t) {
      TMap3D.MilitaryPlot.FineArrow.call(this, e, t),
        (this.properties.plotType = TMap3D.Military_PlotTypes.ASSAULT_DIRECTION),
        (this.properties.plotName = '突击方向');
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.FineArrow),
      (e.prototype.initConsts = function () {
        (this.tailWidthFactor = 0.2),
          (this.neckWidthFactor = 0.25),
          (this.headWidthFactor = 0.3),
          (this.headAngle = Math.PI / 4),
          (this.neckAngle = 0.17741 * Math.PI),
          (this.fixPointCount = 2);
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.ClosedCurve = function (e, t) {
      TMap3D.MilitaryPlot.Polygon.call(this, e, t),
        (this.properties.plotType = TMap3D.Military_PlotTypes.CLOSED_CURVE),
        (this.properties.plotName = '曲线面');
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.Polygon),
      (e.prototype.initConsts = function () {
        this.t = 0.3;
      }),
      (e.prototype.generate = function () {
        if (!((t = this.getPointCount()) < 2))
          if (2 == t) this.generatePositions(this.coordinates[0]);
          else {
            var e = this.getPoints();
            e.push(e[0], e[1]);
            for (var t, i = [], o = 0; o < e.length - 2; o++)
              var n = TMap3D.Utils.NormalUtils.getBisectorNormals(this.t, e[o], e[o + 1], e[o + 2]), i = i.concat(n);
            i = [i[(t = i.length) - 1]].concat(i.slice(0, t - 1));
            for (var r = [], o = 0; o < e.length - 2; o++) {
              var s = e[o],
                a = e[o + 1];
              r.push(s);
              for (var l = 0; l <= TMap3D.Utils.NormalUtils.FITTING_COUNT; l++) {
                var h = TMap3D.Utils.NormalUtils.getCubicValue(
                  l / TMap3D.Utils.NormalUtils.FITTING_COUNT,
                  s,
                  i[2 * o],
                  i[2 * o + 1],
                  a,
                );
                r.push(h);
              }
              r.push(a);
            }
            this.generatePositions(r);
          }
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.DoubleArrow = function (e, t) {
        TMap3D.MilitaryPlot.Polygon.call(this, e, t),
          (this.properties.plotType = TMap3D.Military_PlotTypes.DOUBLE_ARROW),
          (this.properties.plotName = '钳击');
      }),
      m = TMap3D.Utils.NormalUtils;
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.Polygon),
      (e.prototype.initConsts = function () {
        (this.headHeightFactor = 0.25),
          (this.headWidthFactor = 0.3),
          (this.neckHeightFactor = 0.85),
          (this.neckWidthFactor = 0.15),
          (this.connPoint = null),
          (this.tempPoint4 = null),
          (this.fixPointCount = 4);
      }),
      (e.prototype.generate = function () {
        var e,
          t,
          i,
          o,
          n,
          r,
          s,
          a = this.getPointCount();
        a < 2 ||
          (2 != a
            ? ((r = this.coordinates[0][0]),
              (i = this.coordinates[0][1]),
              (s = this.coordinates[0][2]),
              (a = this.getPointCount()),
              (this.tempPoint4 = 3 == a ? this.getTempPoint4(r, i, s) : this.coordinates[0][3]),
              (this.connPoint = 3 == a || 4 == a ? m.mid(r, i) : this.coordinates[0][4]),
              (e = m.isClockWise(r, i, s)
                ? ((o = this.getArrowPoints(r, this.connPoint, this.tempPoint4, !1)),
                  this.getArrowPoints(this.connPoint, i, s, !0))
                : ((o = this.getArrowPoints(i, this.connPoint, s, !1)),
                  this.getArrowPoints(this.connPoint, r, this.tempPoint4, !0))),
              (n = o.length),
              (a = o.slice(0, (t = (n - 5) / 2))),
              (i = o.slice(t, 5 + t)),
              (s = o.slice(5 + t, n)),
              (r = e.slice(0, t)),
              (o = e.slice(t, 5 + t)),
              (n = e.slice(5 + t, n)),
              (r = m.getBezierPoints(r)),
              (a = m.getBezierPoints(n.concat(a.slice(1)))),
              (s = m.getBezierPoints(s)),
              (s = r.concat(o, a, i, s)),
              this.generatePositions(s))
            : this.generatePositions(this.coordinates[0]));
      }),
      (e.prototype.getArrowPoints = function (e, t, i, o) {
        var n = m.mid(e, t),
          r = m.distance(n, i),
          s = m.getThirdPoint(i, n, 0, 0.3 * r, !0),
          a = m.getThirdPoint(i, n, 0, 0.5 * r, !0),
          s = [
            n,
            (s = m.getThirdPoint(n, s, m.HALF_PI, r / 5, o)),
            (a = m.getThirdPoint(n, a, m.HALF_PI, r / 4, o)),
            i,
          ],
          n = this.getArrowHeadPoints(
            s,
            this.headHeightFactor,
            this.headWidthFactor,
            this.neckHeightFactor,
            this.neckWidthFactor,
          ),
          r = n[0],
          o = n[4],
          a = m.distance(e, t) / m.getBaseLength(s) / 2,
          i = this.getArrowBodyPoints(s, r, o, a),
          s = i.length,
          a = i.slice(0, s / 2),
          s = i.slice(s / 2, s);
        return a.push(r), s.push(o), (a = a.reverse()).push(t), (s = s.reverse()).push(e), a.reverse().concat(n, s);
      }),
      (e.prototype.getArrowHeadPoints = function (e, t, i) {
        var o = m.getBaseLength(e) * this.headHeightFactor,
          n = e[e.length - 1],
          r = (m.distance(t, i), o * this.headWidthFactor),
          t = o * this.neckWidthFactor,
          i = o * this.neckHeightFactor,
          o = m.getThirdPoint(e[e.length - 2], n, 0, o, !0),
          e = m.getThirdPoint(e[e.length - 2], n, 0, i, !0),
          i = m.getThirdPoint(n, o, m.HALF_PI, r, !1),
          r = m.getThirdPoint(n, o, m.HALF_PI, r, !0);
        return [m.getThirdPoint(n, e, m.HALF_PI, t, !1), i, n, r, m.getThirdPoint(n, e, m.HALF_PI, t, !0)];
      }),
      (e.prototype.getArrowBodyPoints = function (e, t, i, o) {
        for (
          var n = m.wholeDistance(e),
            r = m.getBaseLength(e) * o,
            s = (r - m.distance(t, i)) / 2,
            a = 0,
            l = [],
            h = [],
            u = 1;
          u < e.length - 1;
          u++
        ) {
          var c = m.getAngleOfThreePoints(e[u - 1], e[u], e[u + 1]) / 2,
            p = (r / 2 - ((a += m.distance(e[u - 1], e[u])) / n) * s) / Math.sin(c),
            d = m.getThirdPoint(e[u - 1], e[u], Math.PI - c, p, !0),
            p = m.getThirdPoint(e[u - 1], e[u], c, p, !1);
          l.push(d), h.push(p);
        }
        return l.concat(h);
      }),
      (e.prototype.getTempPoint4 = function (e, t, i) {
        var o,
          n,
          r = m.mid(e, t),
          t = m.distance(r, i),
          i = m.getAngleOfThreePoints(e, r, i),
          s =
            i < m.HALF_PI
              ? ((o = t * Math.sin(i)),
                (s = t * Math.cos(i)),
                (n = m.getThirdPoint(e, r, m.HALF_PI, o, !1)),
                m.getThirdPoint(r, n, m.HALF_PI, s, !0))
              : i >= m.HALF_PI && i < Math.PI
              ? ((o = t * Math.sin(Math.PI - i)),
                (s = t * Math.cos(Math.PI - i)),
                (n = m.getThirdPoint(e, r, m.HALF_PI, o, !1)),
                m.getThirdPoint(r, n, m.HALF_PI, s, !1))
              : i >= Math.PI && i < 1.5 * Math.PI
              ? ((o = t * Math.sin(i - Math.PI)),
                (s = t * Math.cos(i - Math.PI)),
                (n = m.getThirdPoint(e, r, m.HALF_PI, o, !0)),
                m.getThirdPoint(r, n, m.HALF_PI, s, !0))
              : ((o = t * Math.sin(2 * Math.PI - i)),
                (s = t * Math.cos(2 * Math.PI - i)),
                (n = m.getThirdPoint(e, r, m.HALF_PI, o, !0)),
                m.getThirdPoint(r, n, m.HALF_PI, s, !1));
        return s;
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.GatheringPlace = function (e, t) {
        TMap3D.MilitaryPlot.Polygon.call(this, e, t),
          (this.properties.plotType = TMap3D.Military_PlotTypes.GATHERING_PLACE),
          (this.properties.plotName = '集结地');
      }),
      c = TMap3D.Utils.NormalUtils;
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.Polygon),
      (e.prototype.initConsts = function () {
        (this.t = 0.4), (this.fixPointCount = 3);
      }),
      (e.prototype.generate = function () {
        var e,
          t = this.getPoints();
        if (!(t.length < 2)) {
          2 == this.getPointCount() &&
            ((i = c.mid(t[0], t[1])),
            (e = c.distance(t[0], i) / 0.9),
            (u = c.getThirdPoint(t[0], i, c.HALF_PI, e, !0)),
            (t = [t[0], u, t[1]]));
          var i = c.mid(t[0], t[2]);
          t.push(i, t[0], t[1]);
          for (var o = [], n = 0; n < t.length - 2; n++)
            var r = t[n], s = t[n + 1], a = t[n + 2], a = c.getBisectorNormals(this.t, r, s, a), o = o.concat(a);
          i = o.length;
          o = [o[i - 1]].concat(o.slice(0, i - 1));
          for (var l = [], n = 0; n < t.length - 2; n++) {
            (r = t[n]), (s = t[n + 1]), l.push(r);
            for (var h = 0; h <= c.FITTING_COUNT; h++) {
              var u = c.getCubicValue(h / c.FITTING_COUNT, r, o[2 * n], o[2 * n + 1], s);
              l.push(u);
            }
            l.push(s);
          }
          this.generatePositions(l);
        }
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.SquadCombat = function (e, t) {
        TMap3D.MilitaryPlot.AttackArrow.call(this, e, t),
          (this.properties.plotType = TMap3D.Military_PlotTypes.SQUAD_COMBAT),
          (this.properties.plotName = '分队战斗'),
          (this.minPointCount = 2);
      }),
      a = TMap3D.Utils.NormalUtils;
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.AttackArrow),
      (e.prototype.initConsts = function () {
        (this.headHeightFactor = 0.18),
          (this.headWidthFactor = 0.3),
          (this.neckHeightFactor = 0.85),
          (this.neckWidthFactor = 0.15),
          (this.tailWidthFactor = 0.1);
      }),
      (e.prototype.generate = function () {
        var e,
          t,
          i,
          o,
          n,
          r,
          s = this.getPointCount();
        s < 2 ||
          ((r = this.getPoints()),
          (e = this.getTailPoints(r)),
          (i = (t = this.getArrowHeadPoints(r, e[0], e[1]))[0]),
          (o = t[4]),
          (s = (n = this.getArrowBodyPoints(r, i, o, this.tailWidthFactor)).length),
          (r = [e[0]].concat(n.slice(0, s / 2))).push(i),
          (s = [e[1]].concat(n.slice(s / 2, s))).push(o),
          (r = a.getQBSplinePoints(r)),
          (s = a.getQBSplinePoints(s)),
          this.generatePositions(r.concat(t, s.reverse())));
      }),
      (e.prototype.getTailPoints = function (e) {
        var t = a.getBaseLength(e) * this.tailWidthFactor;
        return [a.getThirdPoint(e[1], e[0], a.HALF_PI, t, !1), a.getThirdPoint(e[1], e[0], a.HALF_PI, t, !0)];
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.TailedAttackArrow = function (e, t) {
      TMap3D.MilitaryPlot.AttackArrow.call(this, e, t),
        (this.properties.plotType = TMap3D.Military_PlotTypes.TAILED_ATTACK_ARROW),
        (this.properties.plotName = '进攻方向尾');
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.AttackArrow),
      (e.prototype.initConsts = function () {
        (this.headHeightFactor = 0.18),
          (this.headWidthFactor = 0.3),
          (this.neckHeightFactor = 0.85),
          (this.neckWidthFactor = 0.15),
          (this.tailWidthFactor = 0.1),
          (this.headTailFactor = 0.8),
          (this.swallowTailFactor = 1),
          (this.swallowTailPnt = null);
      }),
      (e.prototype.generate = function () {
        var e,
          t,
          i,
          o,
          n,
          r,
          s,
          a,
          l,
          h = this.getPointCount();
        h < 2 ||
          (2 != this.getPointCount()
            ? ((l = (s = this.getPoints())[0]),
              (e = s[1]),
              TMap3D.Utils.NormalUtils.isClockWise(s[0], s[1], s[2]) && ((l = s[1]), (e = s[0])),
              (t = [TMap3D.Utils.NormalUtils.mid(l, e)].concat(s.slice(2))),
              (o = (i = this.getArrowHeadPoints(t, l, e))[0]),
              (n = i[4]),
              (r = TMap3D.Utils.NormalUtils.distance(l, e)),
              (s = (a = TMap3D.Utils.NormalUtils.getBaseLength(t)) * this.tailWidthFactor * this.swallowTailFactor),
              (this.swallowTailPnt = TMap3D.Utils.NormalUtils.getThirdPoint(t[1], t[0], 0, s, !0)),
              (h = (a = this.getArrowBodyPoints(t, o, n, r / a)).length),
              (l = [l].concat(a.slice(0, h / 2))).push(o),
              (h = [e].concat(a.slice(h / 2, h))).push(n),
              (l = TMap3D.Utils.NormalUtils.getQBSplinePoints(l)),
              (h = TMap3D.Utils.NormalUtils.getQBSplinePoints(h)),
              this.generatePositions(l.concat(i, h.reverse(), [this.swallowTailPnt, l[0]])))
            : this.generatePositions(this.coordinates[0]));
      });
  })(),
  (function () {
    var e = (TMap3D.MilitaryPlot.TailedSquadCombat = function (e, t) {
        TMap3D.MilitaryPlot.AttackArrow.call(this, e, t),
          (this.properties.plotType = TMap3D.Military_PlotTypes.TAILED_SQUAD_COMBAT),
          (this.properties.plotName = '分队战斗尾'),
          (this.minPointCount = 2);
      }),
      a = TMap3D.Utils.NormalUtils;
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.MilitaryPlot.AttackArrow),
      (e.prototype.initConsts = function () {
        (this.headHeightFactor = 0.18),
          (this.headWidthFactor = 0.3),
          (this.neckHeightFactor = 0.85),
          (this.neckWidthFactor = 0.15),
          (this.tailWidthFactor = 0.1),
          (this.swallowTailFactor = 1),
          (this.swallowTailPnt = null);
      }),
      (e.prototype.generate = function () {
        var e,
          t,
          i,
          o,
          n,
          r,
          s = this.getPointCount();
        s < 2 ||
          ((r = this.getPoints()),
          (e = this.getTailPoints(r)),
          (i = (t = this.getArrowHeadPoints(r, e[0], e[2]))[0]),
          (o = t[4]),
          (s = (n = this.getArrowBodyPoints(r, i, o, this.tailWidthFactor)).length),
          (r = [e[0]].concat(n.slice(0, s / 2))).push(i),
          (s = [e[2]].concat(n.slice(s / 2, s))).push(o),
          (r = a.getQBSplinePoints(r)),
          (s = a.getQBSplinePoints(s)),
          this.generatePositions(r.concat(t, s.reverse(), [e[1], r[0]])));
      }),
      (e.prototype.getTailPoints = function (e) {
        var t = a.getBaseLength(e) * this.tailWidthFactor,
          i = a.getThirdPoint(e[1], e[0], a.HALF_PI, t, !1),
          o = a.getThirdPoint(e[1], e[0], a.HALF_PI, t, !0),
          t = t * this.swallowTailFactor;
        return [i, a.getThirdPoint(e[1], e[0], 0, t, !0), o];
      });
  })(),
  (TMap3D.MilitaryPlot.PlotFactory = {
    createPlot: function (e, t, i) {
      switch (t) {
        case TMap3D.Military_PlotTypes.POLYGON:
          return new TMap3D.MilitaryPlot.Polygon(e, i);
        case TMap3D.Military_PlotTypes.DOUBLE_ARROW:
          return new TMap3D.MilitaryPlot.DoubleArrow(e, i);
        case TMap3D.Military_PlotTypes.ATTACK_ARROW:
          return new TMap3D.MilitaryPlot.AttackArrow(e, i);
        case TMap3D.Military_PlotTypes.ELLIPSE:
          return new TMap3D.MilitaryPlot.Ellipse(e, i);
        case TMap3D.Military_PlotTypes.CIRCLE:
          return new TMap3D.MilitaryPlot.Circle(e, i);
        case TMap3D.Military_PlotTypes.FINE_ARROW:
          return new TMap3D.MilitaryPlot.FineArrow(e, i);
        case TMap3D.Military_PlotTypes.TAILED_ATTACK_ARROW:
          return new TMap3D.MilitaryPlot.TailedAttackArrow(e, i);
        case TMap3D.Military_PlotTypes.ASSAULT_DIRECTION:
          return new TMap3D.MilitaryPlot.AssaultDirection(e, i);
        case TMap3D.Military_PlotTypes.GATHERING_PLACE:
          return new TMap3D.MilitaryPlot.GatheringPlace(e, i);
        case TMap3D.Military_PlotTypes.CLOSED_CURVE:
          return new TMap3D.MilitaryPlot.ClosedCurve(e, i);
        case TMap3D.Military_PlotTypes.SECTOR:
          return new TMap3D.MilitaryPlot.Sector(e, i);
        case TMap3D.Military_PlotTypes.RECTANGLE:
          return new TMap3D.MilitaryPlot.Rectangle(e, i);
        case TMap3D.Military_PlotTypes.SQUAD_COMBAT:
          return new TMap3D.MilitaryPlot.SquadCombat(e, i);
        case TMap3D.Military_PlotTypes.TAILED_SQUAD_COMBAT:
          return new TMap3D.MilitaryPlot.TailedSquadCombat(e, i);
        case TMap3D.Military_PlotTypes.MARKER:
          return new TMap3D.MilitaryPlot.Marker(e, i);
        case TMap3D.Military_PlotTypes.POLYLINE:
          return new TMap3D.MilitaryPlot.Polyline(e, i);
      }
    },
  }),
  (function () {
    var e = (TMap3D.ParticlePlot.PlotBase = function (e, t) {
      (this.viewer = e),
        (this.properties = t.properties),
        (this.coordinates = t.geometry.coordinates),
        (this.properties.plotBase = 'Particle'),
        (this.style = this.properties.style),
        (this.position = Cesium.Cartesian3.fromDegrees(this.coordinates[0], this.coordinates[1], this.coordinates[2])),
        (this.transX = this.properties.transX || 0),
        (this.transY = this.properties.transY || 0),
        (this.transZ = this.properties.transZ || 0);
    });
    (e.prototype.setSelected = function (e) {}),
      (e.prototype.toGeoJson = function () {
        return {
          type: 'Feature',
          properties: this.properties,
          geometry: { type: 'Point', coordinates: this.coordinates },
        };
      });
  })(),
  (function () {
    var e = (TMap3D.ParticlePlot.FirePlot = function (e, t) {
      TMap3D.ParticlePlot.PlotBase.call(this, e, t),
        (this.properties.plotType = TMap3D.ParticlePlotTypes.FIRE),
        (this.properties.plotName = '火焰'),
        (this.style = t.properties.style || this.getDefaultStyle()),
        (this.properties.style = this.style),
        this.init();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.ParticlePlot.PlotBase),
      (e.prototype.init = function () {
        (this.entity = this.viewer.entities.add({ position: this.position })),
          (this.particleSystem = this.createParticleSystem()),
          this.viewer.scene.primitives.add(this.particleSystem),
          this.addEvent();
      }),
      (e.prototype.addEvent = function () {
        (this.emitterModelMatrix = new Cesium.Matrix4()),
          (this.translation = new Cesium.Cartesian3()),
          (this.rotation = new Cesium.Quaternion()),
          (this.hpr = new Cesium.HeadingPitchRoll()),
          (this.trs = new Cesium.TranslationRotationScale()),
          this.viewer.scene.preUpdate.addEventListener(this.preUpdateEvent, this);
      }),
      (e.prototype.removeEvent = function () {
        this.viewer.scene.preUpdate.removeEventListener(this.preUpdateEvent, this),
          (this.emitterModelMatrix = void 0),
          (this.translation = void 0),
          (this.rotation = void 0),
          (this.hpr = void 0),
          (this.trs = void 0);
      }),
      (e.prototype.preUpdateEvent = function (e, t) {
        (this.particleSystem.modelMatrix = this.entity.computeModelMatrix(t, new Cesium.Matrix4())),
          (this.hpr = Cesium.HeadingPitchRoll.fromDegrees(0, 0, 0, this.hpr)),
          (this.trs.translation = Cesium.Cartesian3.fromElements(
            this.transX,
            this.transY,
            this.transZ,
            this.translation,
          )),
          (this.trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(this.hpr, this.rotation)),
          (this.particleSystem.emitterModelMatrix = Cesium.Matrix4.fromTranslationRotationScale(
            this.trs,
            this.emitterModelMatrix,
          ));
      }),
      (e.prototype.createParticleSystem = function () {
        return new Cesium.ParticleSystem({
          image: this.style.fireImage,
          startColor: new Cesium.Color(1, 1, 1, 1),
          endColor: new Cesium.Color(0.5, 0, 0, 0),
          startScale: this.style.startScale,
          endScale: this.style.endScale,
          minimumParticleLife: this.style.minimumParticleLife,
          maximumParticleLife: this.style.maximumParticleLife,
          minimumSpeed: this.style.minimumSpeed,
          maximumSpeed: this.style.maximumSpeed,
          imageSize: new Cesium.Cartesian2(this.style.particleSize, this.style.particleSize),
          emissionRate: this.style.emissionRate,
          lifetime: 16,
          loop: !0,
          emitter: new Cesium.ConeEmitter(Cesium.Math.toRadians(45)),
          sizeInMeters: !0,
        });
      }),
      (e.prototype.remove = function () {
        this.removeEvent(),
          this.viewer.scene.primitives.remove(this.particleSystem),
          this.viewer.entities.remove(this.entity);
      }),
      (e.prototype.updateStyle = function () {
        (this.particleSystem.startScale = this.style.startScale),
          (this.particleSystem.endScale = this.style.endScale),
          (this.particleSystem.minimumParticleLife = this.style.minimumParticleLife),
          (this.particleSystem.maximumParticleLife = this.style.maximumParticleLife),
          (this.particleSystem.minimumSpeed = this.style.minimumSpeed),
          (this.particleSystem.maximumSpeed = this.style.maximumSpeed),
          (this.particleSystem.imageSize = new Cesium.Cartesian2(this.style.particleSize, this.style.particleSize)),
          (this.particleSystem.emissionRate = this.style.emissionRate);
      }),
      (e.prototype.getDefaultStyle = function () {
        return {
          fireImage: TMap3D.BaseUtils.getHostPath() + '/TMap/effects/fire.png',
          startScale: 3,
          endScale: 1.5,
          minimumParticleLife: 1.5,
          maximumParticleLife: 1.8,
          minimumSpeed: 7,
          maximumSpeed: 9,
          particleSize: 2,
          emissionRate: 200,
        };
      });
  })(),
  (function () {
    var e = (TMap3D.ParticlePlot.FountainPlot = function (e, t) {
      TMap3D.ParticlePlot.PlotBase.call(this, e, t),
        (this.properties.plotType = TMap3D.ParticlePlotTypes.FOUNTAIN),
        (this.properties.plotName = '喷泉'),
        (this.style = t.properties.style || this.getDefaultStyle()),
        (this.properties.style = this.style),
        this.init();
    });
    TMap3D.BaseUtils.inheritPrototype(e, TMap3D.ParticlePlot.PlotBase),
      (e.prototype.init = function () {
        (this.entity = this.viewer.entities.add({ position: this.position })),
          (this.particleSystem = this.createParticleSystem()),
          this.viewer.scene.primitives.add(this.particleSystem),
          this.addEvent();
      }),
      (e.prototype.addEvent = function () {
        (this.emitterModelMatrix = new Cesium.Matrix4()),
          (this.translation = new Cesium.Cartesian3()),
          (this.rotation = new Cesium.Quaternion()),
          (this.hpr = new Cesium.HeadingPitchRoll()),
          (this.trs = new Cesium.TranslationRotationScale()),
          this.viewer.scene.preUpdate.addEventListener(this.preUpdateEvent, this);
      }),
      (e.prototype.removeEvent = function () {
        this.viewer.scene.preUpdate.removeEventListener(this.preUpdateEvent, this),
          (this.emitterModelMatrix = void 0),
          (this.translation = void 0),
          (this.rotation = void 0),
          (this.hpr = void 0),
          (this.trs = void 0);
      }),
      (e.prototype.preUpdateEvent = function (e, t) {
        (this.particleSystem.modelMatrix = this.entity.computeModelMatrix(t, new Cesium.Matrix4())),
          (this.hpr = Cesium.HeadingPitchRoll.fromDegrees(0, 0, 0, this.hpr)),
          (this.trs.translation = Cesium.Cartesian3.fromElements(
            this.transX,
            this.transY,
            this.transZ,
            this.translation,
          )),
          (this.trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(this.hpr, this.rotation)),
          (this.particleSystem.emitterModelMatrix = Cesium.Matrix4.fromTranslationRotationScale(
            this.trs,
            this.emitterModelMatrix,
          ));
      }),
      (e.prototype.createParticleSystem = function () {
        var i = this;
        return (
          (this.gravityScratch = new Cesium.Cartesian3()),
          new Cesium.ParticleSystem({
            image: this.style.fountainImage,
            startColor: new Cesium.Color(1, 1, 1, 0.6),
            endColor: new Cesium.Color(0.8, 0.86, 1, 0.4),
            startScale: this.style.startScale,
            endScale: this.style.endScale,
            minimumParticleLife: this.style.minimumParticleLife,
            maximumParticleLife: this.style.maximumParticleLife,
            minimumSpeed: this.style.minimumSpeed,
            maximumSpeed: this.style.maximumSpeed,
            imageSize: new Cesium.Cartesian2(this.style.particleSize, this.style.particleSize),
            emissionRate: this.style.emissionRate,
            lifetime: 16,
            emitter: new Cesium.CircleEmitter(0.2),
            updateCallback: function (e, t) {
              return i.applyGravity(e, t);
            },
            sizeInMeters: !0,
            performance: !1,
          })
        );
      }),
      (e.prototype.applyGravity = function (e, t) {
        var i = this.particleSystem._target ? this.particleSystem._target.clone() : new Cesium.Cartesian3(0, 0, 0);
        Cesium.Cartesian3.add(e.position, i, e.position),
          Cesium.Cartesian3.normalize(e.position, this.gravityScratch),
          Cesium.Cartesian3.multiplyByScalar(this.gravityScratch, this.style.gravity * t, this.gravityScratch),
          (e.velocity = Cesium.Cartesian3.add(e.velocity, this.gravityScratch, e.velocity));
      }),
      (e.prototype.updateStyle = function () {
        (this.particleSystem.image = this.style.fountainImage),
          (this.particleSystem.startColor = this.style.startColor),
          (this.particleSystem.endColor = this.style.endColor),
          (this.particleSystem.startScale = this.style.startScale),
          (this.particleSystem.endScale = this.style.endScale),
          (this.particleSystem.minimumParticleLife = this.style.minimumParticleLife),
          (this.particleSystem.maximumParticleLife = this.style.maximumParticleLife),
          (this.particleSystem.minimumSpeed = this.style.minimumSpeed),
          (this.particleSystem.maximumSpeed = this.style.maximumSpeed),
          (this.particleSystem.imageSize = new Cesium.Cartesian2(this.style.particleSize, this.style.particleSize)),
          (this.particleSystem.emissionRate = this.style.emissionRate);
      }),
      (e.prototype.remove = function () {
        this.removeEvent(),
          this.viewer.scene.primitives.remove(this.particleSystem),
          this.viewer.entities.remove(this.entity);
      }),
      (e.prototype.getDefaultStyle = function () {
        return {
          fountainImage: TMap3D.BaseUtils.getHostPath() + '/TMap/effects/fountain.png',
          emissionRate: 40,
          gravity: -3.5,
          minimumParticleLife: 6,
          maximumParticleLife: 7,
          minimumSpeed: 9,
          maximumSpeed: 9.5,
          startScale: 1,
          endScale: 7,
          particleSize: 1,
        };
      });
  })(),
  (TMap3D.ParticlePlot.PlotFactory = {
    createPlot: function (e, t, i) {
      switch (t) {
        case TMap3D.ParticlePlotTypes.FIRE:
          return new TMap3D.ParticlePlot.FirePlot(e, i);
        case TMap3D.ParticlePlotTypes.FOUNTAIN:
          return new TMap3D.ParticlePlot.FountainPlot(e, i);
      }
    },
  }),
  (function () {
    var e = (TMap3D.Tools.MousePoint = function (e) {
      (this.viewer = e), this.addPoint();
    });
    (e.prototype.addPoint = function () {
      this.mousePointEntity = this.viewer.entities.add({
        point: { pixelSize: 8, color: Cesium.Color.AQUA, outlineWidth: 1, outlineColor: Cesium.Color.WHITE },
      });
    }),
      (e.prototype.updatePosition = function (e) {
        this.mousePointEntity.position = e;
      }),
      (e.prototype.remove = function () {
        this.viewer.entities.remove(this.mousePointEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.EntityDraw = function (e) {
      (this.viewer = e),
        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
        ),
        this.initEvents();
    });
    (e.prototype.activate = function (e) {
      this.deactivate(),
        this.clear(),
        (this.drawType = e),
        (this.positions = []),
        (this.tempPositions = []),
        this.registerEvents(),
        (this.viewer.enableCursorStyle = !1),
        (this.viewer._element.style.cursor = 'default');
    }),
      (e.prototype.deactivate = function () {
        this.unRegisterEvents(),
          (this.drawType = void 0),
          (this.drawEntity = void 0),
          (this.viewer._element.style.cursor = 'pointer'),
          (this.viewer.enableCursorStyle = !0);
      }),
      (e.prototype.clear = function () {
        this.drawEntity && (this.viewer.entities.remove(this.drawEntity), (this.drawEntity = void 0));
      }),
      (e.prototype.initEvents = function () {
        (this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
          (this.DrawStartEvent = new Cesium.Event()),
          (this.DrawEndEvent = new Cesium.Event());
      }),
      (e.prototype.registerEvents = function () {
        this.leftClickEvent(), this.rightClickEvent(), this.mouseMoveEvent();
      }),
      (e.prototype.leftClickEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          i.viewer._element.style.cursor = 'default';
          var t = i.viewer.scene.pickPosition(e.position);
          (t = t || i.viewer.scene.camera.pickEllipsoid(e.position, i.viewer.scene.globe.ellipsoid)) &&
            (i.positions.push(t), 1 == i.positions.length && i.handleFirstPosition());
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.handleFirstPosition = function () {
        switch (this.drawType) {
          case 'Point':
            this.generatePoint(), this.drawEnd();
            break;
          case 'Polyline':
            this.generatePolyline();
            break;
          case 'Polygon':
            this.generatePolygon();
        }
      }),
      (e.prototype.generatePoint = function () {
        this.drawEntity = this.viewer.entities.add({
          position: this.positions[0],
          point: { pixelSize: 4, color: Cesium.Color.RED },
        });
      }),
      (e.prototype.generatePolyline = function () {
        var t = this;
        this.drawEntity = this.viewer.entities.add({
          polyline: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.tempPositions;
            }, !1),
            width: 2,
            material: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
          },
        });
      }),
      (e.prototype.generatePolygon = function () {
        var t = this;
        this.drawEntity = this.viewer.entities.add({
          polygon: {
            hierarchy: new Cesium.CallbackProperty(function (e) {
              return new Cesium.PolygonHierarchy(t.tempPositions);
            }, !1),
            material: Cesium.Color.RED.withAlpha(0.4),
            perPositionHeight: !0,
          },
          polyline: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.tempPositions.concat(t.tempPositions[0]);
            }, !1),
            width: 1,
            material: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
          },
        });
      }),
      (e.prototype.mouseMoveEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          i.viewer._element.style.cursor = 'default';
          var t = i.viewer.scene.pickPosition(e.endPosition);
          (t = t || i.viewer.scene.camera.pickEllipsoid(e.startPosition, i.viewer.scene.globe.ellipsoid)) &&
            i.drawEntity &&
            (i.tempPositions = i.positions.concat([t]));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.rightClickEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          if (t.drawEntity) {
            switch (t.drawType) {
              case 'Polyline':
                (t.drawEntity.polyline.positions = t.positions), (t.minPositionCount = 2);
                break;
              case 'Polygon':
                (t.drawEntity.polygon.hierarchy = t.positions),
                  (t.drawEntity.polyline.positions = t.positions.concat(t.positions[0])),
                  (t.minPositionCount = 3);
            }
            if (t.positions.length < t.minPositionCount) return t.clear(), void t.deactivate();
            t.drawEnd();
          } else t.deactivate();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.unRegisterEvents = function () {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      }),
      (e.prototype.drawEnd = function () {
        var e = this;
        (this.drawEntity.remove = function () {
          e.viewer.entities.remove(e.drawEntity);
        }),
          this.DrawEndEvent.raiseEvent(this.drawEntity, this.positions, this.drawType),
          this.deactivate();
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.HtmlPlotEditor = function (e, t) {
      (this.viewer = e), (this.htmlPlotLayer = t), this.registerMouseEvents();
    });
    (e.prototype.registerMouseEvents = function () {
      (this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
        this.initLeftDownEventHandler(),
        this.initMouseMoveEventHandler(),
        this.initLeftUpEventHandler();
    }),
      (e.prototype.unRegisterMouseEvents = function () {
        this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.destroy = function () {
        this.unRegisterMouseEvents(),
          (this.viewer = void 0),
          (this.htmlPlotLayer = void 0),
          (this.eventHandler = void 0);
      }),
      (e.prototype.initLeftDownEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          !t.htmlPlotLayer.selectedPlot ||
            ((e = t.viewer.scene.pick(e.position)) &&
              e.id &&
              'HtmlPlot' === e.id.type &&
              t.htmlPlotLayer.selectedPlot.properties.plotCode == e.id.plotCode &&
              ((t.viewer.enableCursorStyle = !1),
              (document.body.style.cursor = 'move'),
              (t.moveing = !0),
              (t.mousePoint = new TMap3D.Tools.MousePoint(t.viewer)),
              (t.viewer.scene.screenSpaceCameraController.enableRotate = !1)));
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      }),
      (e.prototype.initLeftUpEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          t.moveing &&
            ((t.viewer.enableCursorStyle = !0),
            (document.body.style.cursor = 'default'),
            (t.moveing = !1),
            (t.viewer.scene.screenSpaceCameraController.enableRotate = !0),
            t.mousePoint.remove(),
            (t.mousePoint = void 0));
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
      }),
      (e.prototype.initMouseMoveEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          !t.moveing ||
            ((e = t.viewer.scene.pickPosition(e.endPosition)) &&
              (t.mousePoint.updatePosition(e), t.htmlPlotLayer.selectedPlot.updatePosition(e)));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.EntityEdit = function (e) {
      (this.viewer = e), this.initEventHandler();
    });
    (e.prototype.initEventHandler = function () {
      (this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
        (this.EditEndEvent = new Cesium.Event());
    }),
      (e.prototype.activate = function () {
        this.deactivate(), this.initLeftClickEventHandler();
      }),
      (e.prototype.deactivate = function () {
        this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.unRegisterEvents(),
          this.clearAllEditVertex();
      }),
      (e.prototype.clearAllEditVertex = function () {
        this.clearEditVertex(), this.clearMidVertex();
      }),
      (e.prototype.initLeftClickEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          e = t.viewer.scene.pick(e.position);
          e && e.id
            ? e.id &&
              e.id.Type &&
              ((t.editEntity && t.editEntity.id == e.id.id) || (t.handleEditEntity(), t.handlePickEditEntity(e.id)))
            : t.handleEditEntity();
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.handleEditEntity = function () {
        this.unRegisterEvents(), this.clearAllEditVertex();
        var e = this.editEntity;
        e &&
          (this.closeEntityEditMode(),
          (this.editEntity = void 0),
          this.isEdited && (this.EditEndEvent.raiseEvent(e), (this.isEdited = !1), (this.isEditing = !1)));
      }),
      (e.prototype.handlePickEditEntity = function (e) {
        -1 != ['EditableMarker', 'EditablePolyline', 'EditablePolygon'].indexOf(e.Type) &&
          ((this.editEntity = e),
          (this.isEditing = !1),
          (this.isEdited = !1),
          (this.editPositions = this.getEditEntityPositions()),
          (this.EditMoveCenterPositoin = this.getCenterPosition()),
          this.openEntityEditModel(),
          this.clearAllEditVertex(),
          this.unRegisterEvents(),
          this.createEditVertex(),
          this.createMidVertex(),
          this.registerEvents());
      }),
      (e.prototype.openEntityEditModel = function () {
        var t = this;
        switch (this.editEntity.Type) {
          case 'EditableMarker':
            this.editEntity.position = new Cesium.CallbackProperty(function (e) {
              return t.editPositions[0];
            }, !1);
            break;
          case 'EditablePolyline':
            this.editEntity.polyline.positions = new Cesium.CallbackProperty(function (e) {
              return t.editPositions;
            }, !1);
            break;
          case 'EditablePolygon':
            (this.editEntity.polygon.hierarchy = new Cesium.CallbackProperty(function (e) {
              return new Cesium.PolygonHierarchy(t.editPositions);
            }, !1)),
              this.editEntity.polyline &&
                (this.editEntity.polyline.positions = new Cesium.CallbackProperty(function (e) {
                  return t.editPositions.concat(t.editPositions[0]);
                }, !1));
        }
      }),
      (e.prototype.closeEntityEditMode = function () {
        switch (this.editEntity.Type) {
          case 'EditableMarker':
            this.editEntity.position = this.editPositions[0];
            break;
          case 'EditablePolyline':
            this.editEntity.polyline.positions = this.editPositions;
            break;
          case 'EditablePolygon':
            (this.editEntity.polygon.hierarchy = this.editPositions),
              this.editEntity.polyline &&
                (this.editEntity.polyline.positions = this.editPositions.concat(this.editPositions[0]));
        }
      }),
      (e.prototype.getEditEntityPositions = function () {
        switch (this.editEntity.Type) {
          case 'EditableMarker':
            return [this.editEntity.position._value];
          case 'EditablePolyline':
            return this.editEntity.polyline.positions._value;
          case 'EditablePolygon':
            return this.editEntity.polygon.hierarchy._value.positions;
        }
      }),
      (e.prototype.registerEvents = function () {
        this.initLeftDownEventHandler(), this.initMouseMoveEventHandler(), this.initLeftUpEventHandler();
      }),
      (e.prototype.unRegisterEvents = function () {
        this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.initLeftDownEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          e = t.viewer.scene.pick(e.position);
          e &&
            e.id &&
            e.id.type &&
            ('EditVertex' == e.id.type || 'EditMove' == e.id.type
              ? ((t.isEditing = !0),
                (t.viewer.scene.screenSpaceCameraController.enableRotate = !1),
                (t.viewer.enableCursorStyle = !1),
                (t.viewer._element.style.cursor = ''),
                (document.body.style.cursor = 'move'),
                (t.editVertext = e.id),
                (t.editVertext.show = !1),
                t.clearMidVertex())
              : 'EditMidVertex' == e.id.type &&
                (t.editPositions.splice(e.id.vertexIndex, 0, e.id.position._value),
                t.clearAllEditVertex(),
                t.createEditVertex(),
                t.createMidVertex(),
                (t.isEdited = !0)));
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      }),
      (e.prototype.initLeftUpEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          t.isEditing &&
            ((t.viewer.enableCursorStyle = !0),
            (document.body.style.cursor = 'default'),
            (t.viewer.scene.screenSpaceCameraController.enableRotate = !0),
            (t.editVertext.show = !0),
            (t.isEditing = !1),
            t.clearMidVertex(),
            t.createMidVertex());
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
      }),
      (e.prototype.initMouseMoveEventHandler = function () {
        var i = this;
        this.eventHandler.setInputAction(function (e) {
          var t =
            (t = i.viewer.scene.pickPosition(e.endPosition)) ||
            i.viewer.scene.camera.pickEllipsoid(e.endPosition, i.viewer.scene.globe.ellipsoid);
          if (t && i.isEditing) {
            if ('EditMove' == i.editVertext.type) {
              e = i.EditMoveCenterPositoin;
              if (!e) return;
              i.moveEntityByOffset(e, t);
            } else i.editPositions[i.editVertext.vertexIndex] = t;
            (i.isEdited = !0), (i.EditMoveCenterPositoin = i.getCenterPosition());
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.getCenterPosition = function () {
        var t = this,
          i = [],
          o = 0;
        if ('EditableMarker' == this.editEntity.Type) return this.editPositions[0];
        this.editPositions.forEach(function (e) {
          e = t.cartesian3ToPoint3D(e);
          i.push([e.x, e.y]), o < e.z && (o = e.z);
        });
        var e = TMap3D.Utils.MapUtils.getPointsCenter(i);
        return Cesium.Cartesian3.fromDegrees(e[0], e[1], o);
      }),
      (e.prototype.moveEntityByOffset = function (e, t) {
        for (
          var e = this.cartesian3ToPoint3D(e),
            t = this.cartesian3ToPoint3D(t),
            i = t.x - e.x,
            o = t.y - e.y,
            n = void 0,
            r = 0;
          r < this.editPositions.length;
          r++
        )
          ((n = this.cartesian3ToPoint3D(this.editPositions[r])).x += i),
            (n.y += o),
            (this.editPositions[r] = Cesium.Cartesian3.fromDegrees(n.x, n.y, n.z));
      }),
      (e.prototype.createEditVertex = function () {
        var o = this;
        (this.vertexEntities = []),
          this.editPositions.forEach(function (e, t) {
            var i = o.viewer.entities.add({
              position: new Cesium.CallbackProperty(function (e) {
                return o.editPositions[t];
              }, !1),
              type: 'EditVertex',
              vertexIndex: t,
              point: {
                color: Cesium.Color.DARKBLUE.withAlpha(0.4),
                pixelSize: 10,
                outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
                outlineWidth: 3,
                disableDepthTestDistance: 2e3,
              },
            });
            o.vertexEntities.push(i);
          }),
          1 != this.editPositions.length && this.createEditMoveCenterEntity();
      }),
      (e.prototype.createEditMoveCenterEntity = function () {
        var t = this;
        this.EditMoveCenterEntity = this.viewer.entities.add({
          position: new Cesium.CallbackProperty(function (e) {
            return t.EditMoveCenterPositoin;
          }, !1),
          type: 'EditMove',
          point: {
            color: Cesium.Color.RED.withAlpha(0.4),
            pixelSize: 10,
            outlineColor: Cesium.Color.WHITE.withAlpha(0.3),
            outlineWidth: 3,
            disableDepthTestDistance: 2e3,
          },
        });
      }),
      (e.prototype.clearEditVertex = function () {
        var t = this;
        this.vertexEntities &&
          this.vertexEntities.forEach(function (e) {
            t.viewer.entities.remove(e);
          }),
          (this.vertexEntities = []),
          this.viewer.entities.remove(this.EditMoveCenterEntity);
      }),
      (e.prototype.createMidVertex = function () {
        this.midVertexEntities = [];
        for (var e = 0; e < this.editPositions.length; e++) {
          var t = this.editPositions[e],
            i = this.editPositions[e + 1],
            i = this.midPosition(t, i),
            i = this.viewer.entities.add({
              position: i,
              type: 'EditMidVertex',
              vertexIndex: e + 1,
              point: {
                color: Cesium.Color.LIMEGREEN.withAlpha(0.4),
                pixelSize: 10,
                outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
                outlineWidth: 3,
                disableDepthTestDistance: 2e3,
              },
            });
          this.midVertexEntities.push(i);
        }
      }),
      (e.prototype.clearMidVertex = function () {
        var t = this;
        this.midVertexEntities &&
          this.midVertexEntities.forEach(function (e) {
            t.viewer.entities.remove(e);
          }),
          (this.midVertexEntities = []);
      }),
      (e.prototype.cartesian3ToPoint3D = function (e) {
        e = Cesium.Cartographic.fromCartesian(e);
        return { x: Cesium.Math.toDegrees(e.longitude), y: Cesium.Math.toDegrees(e.latitude), z: e.height };
      }),
      (e.prototype.midPosition = function (e, t) {
        if (!e || !t) return null;
        (e = this.cartesian3ToPoint3D(e)),
          (t = this.cartesian3ToPoint3D(t)),
          (t = { x: (e.x + t.x) / 2, y: (e.y + t.y) / 2, z: (e.z + t.z) / 2 });
        return Cesium.Cartesian3.fromDegrees(t.x, t.y, t.z);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.GeoPlotDraw = function (e) {
      (this.viewer = e),
        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
        ),
        this.initEvents();
    });
    (e.prototype.activate = function (e) {
      this.deactivate(),
        this.clear(),
        (this.plotType = e),
        (this.positions = []),
        (this.plotDrawTip = new TMap3D.Controls.PlotDrawTip(this.viewer)),
        (this.MousePoint = new TMap3D.Tools.MousePoint(this.viewer)),
        this.registerEvents(),
        (this.viewer.enableCursorStyle = !1),
        (this.viewer._element.style.cursor = 'default'),
        this.initTip();
    }),
      (e.prototype.initTip = function () {
        switch (this.plotType) {
          case TMap3D.GeoPlot_PlotTypes.MARKER:
            this.plotDrawTip.setContent([
              '当前绘制类型：点，需要1个点',
              '按下鼠标左键确定位置',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.TEXT:
            this.plotDrawTip.setContent([
              '当前绘制类型：文本，需要1个点',
              '按下鼠标左键确定位置',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.POLYLINE:
            this.plotDrawTip.setContent([
              '当前绘制类型：线，最少需要2个点',
              '按下鼠标左键确定第1个点',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.POLYGON:
            this.plotDrawTip.setContent([
              '当前绘制类型：面，最少需要3个点',
              '按下鼠标左键确定第1个点',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.CIRCLE:
            this.plotDrawTip.setContent([
              '当前绘制类型：圆，需要2个点',
              '按下鼠标左键确定第1个点',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.RECTANGLE:
            this.plotDrawTip.setContent([
              '当前绘制类型：矩形，需要2个点',
              '按下鼠标左键确定第1个点',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.DYNAMICFENCE:
            this.plotDrawTip.setContent([
              '当前绘制类型：动态围栏，最少需要2个点',
              '按下鼠标左键确定第1个点',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.NORMALFENCE:
            this.plotDrawTip.setContent([
              '当前绘制类型：静态围栏，最少需要2个点',
              '按下鼠标左键确定第1个点',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.POLYLINEVOLUME:
            this.plotDrawTip.setContent([
              '当前绘制类型：普通墙体，最少需要2个点',
              '按下鼠标左键确定第1个点',
              '按下鼠标右键取消绘制',
            ]);
        }
      }),
      (e.prototype.deactivate = function () {
        this.unRegisterEvents(),
          (this.plotType = void 0),
          (this.viewer._element.style.cursor = 'pointer'),
          (this.viewer.enableCursorStyle = !0),
          this.plotDrawTip &&
            (this.plotDrawTip.remove(),
            this.MousePoint.remove(),
            (this.plotDrawTip = void 0),
            (this.MousePoint = void 0));
      }),
      (e.prototype.clear = function () {
        this.plot && (this.plot.remove(), (this.plot = void 0));
      }),
      (e.prototype.generatePlot = function (e) {
        var t = TMap3D.Utils.MapUtils.getPlotCode(),
          e = this.generateGeoFeature(t, e);
        (this.plot = TMap3D.GeoPlot.PlotFactory.createPlot(this.viewer, this.plotType, e)), this.plot.openEditMode(!0);
      }),
      (e.prototype.generateGeoFeature = function (e, t) {
        var i = void 0,
          o = void 0;
        switch (this.plotType) {
          case TMap3D.GeoPlot_PlotTypes.MARKER:
          case TMap3D.GeoPlot_PlotTypes.TEXT:
            (i = 'Point'), (o = this.getPointCoordinates(t));
            break;
          case TMap3D.GeoPlot_PlotTypes.POLYLINE:
          case TMap3D.GeoPlot_PlotTypes.CIRCLE:
          case TMap3D.GeoPlot_PlotTypes.RECTANGLE:
          case TMap3D.GeoPlot_PlotTypes.DYNAMICFENCE:
          case TMap3D.GeoPlot_PlotTypes.NORMALFENCE:
          case TMap3D.GeoPlot_PlotTypes.POLYLINEVOLUME:
            (i = 'LineString'), (o = this.getLineStringCoordinates(t));
            break;
          case TMap3D.GeoPlot_PlotTypes.POLYGON:
            (i = 'Polygon'), (o = this.getPolygonCoordinates(t));
        }
        return { type: 'Feature', properties: { plotCode: e, style: void 0 }, geometry: { type: i, coordinates: o } };
      }),
      (e.prototype.getPointCoordinates = function (e) {
        e = Cesium.Cartographic.fromCartesian(e[0]);
        return [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height];
      }),
      (e.prototype.getLineStringCoordinates = function (e) {
        var t = [];
        return (
          e.forEach(function (e) {
            (e = Cesium.Cartographic.fromCartesian(e)),
              (e = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height]);
            t.push(e);
          }),
          t
        );
      }),
      (e.prototype.getPolygonCoordinates = function (e) {
        var t = [[]];
        return (
          e.forEach(function (e) {
            (e = Cesium.Cartographic.fromCartesian(e)),
              (e = [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude), e.height]);
            t[0].push(e);
          }),
          t
        );
      }),
      (e.prototype.initEvents = function () {
        (this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
          (this.PlotDrawStartEvent = new Cesium.Event()),
          (this.PlotDrawEndEvent = new Cesium.Event());
      }),
      (e.prototype.registerEvents = function () {
        this.leftClickEvent(), this.rightClickEvent(), this.mouseMoveEvent();
      }),
      (e.prototype.leftClickEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          t.viewer._element.style.cursor = 'default';
          e = t.viewer.scene.pickPosition(e.position);
          e &&
            (t.positions.push(e),
            1 == t.positions.length ? t.generatePlot(t.positions) : t.plot.setPositions(t.positions),
            t.setTipContent(),
            t.plot.fixPositionCount == t.positions.length && (t.drawEnd(), t.deactivate()));
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.setTipContent = function () {
        switch (this.plotType) {
          case TMap3D.GeoPlot_PlotTypes.POLYLINE:
            this.plotDrawTip.setContent([
              '当前绘制类型：线，最少需要2个点。',
              '已有' + this.positions.length + '个点，按下鼠标左键确定第' + (this.positions.length + 1) + '个点',
              this.positions.length < 2 ? '按下鼠标右键取消绘制' : '按下鼠标右键结束绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.POLYGON:
            this.plotDrawTip.setContent([
              '当前绘制类型：面，最少需要3个点。',
              '已有' + this.positions.length + '个点，按下鼠标左键确定第' + (this.positions.length + 1) + '个点',
              this.positions.length < 3 ? '按下鼠标右键取消绘制' : '按下鼠标右键结束绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.CIRCLE:
            this.plotDrawTip.setContent([
              '当前绘制类型：圆，需要2个点。',
              '已有' + this.positions.length + '个点，按下鼠标左键确定第' + (this.positions.length + 1) + '个点',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.RECTANGLE:
            this.plotDrawTip.setContent([
              '当前绘制类型：矩形，需要2个点。',
              '已有' + this.positions.length + '个点，按下鼠标左键确定第' + (this.positions.length + 1) + '个点',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.DYNAMICFENCE:
            this.plotDrawTip.setContent([
              '当前绘制类型：动态围栏，最少需要2个点。',
              '已有' + this.positions.length + '个点，按下鼠标左键确定第' + (this.positions.length + 1) + '个点',
              this.positions.length < 2 ? '按下鼠标右键取消绘制' : '按下鼠标右键结束绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.FENCENORMAL:
            this.plotDrawTip.setContent([
              '当前绘制类型：普通围栏，最少需要2个点。',
              '已有' + this.positions.length + '个点，按下鼠标左键确定第' + (this.positions.length + 1) + '个点',
              this.positions.length < 2 ? '按下鼠标右键取消绘制' : '按下鼠标右键结束绘制',
            ]);
            break;
          case TMap3D.GeoPlot_PlotTypes.POLYLINEVOLUME:
            this.plotDrawTip.setContent([
              '当前绘制类型：普通墙体，最少需要2个点。',
              '已有' + this.positions.length + '个点，按下鼠标左键确定第' + (this.positions.length + 1) + '个点',
              this.positions.length < 2 ? '按下鼠标右键取消绘制' : '按下鼠标右键结束绘制',
            ]);
        }
      }),
      (e.prototype.mouseMoveEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          t.viewer._element.style.cursor = 'default';
          e = t.viewer.scene.pickPosition(e.endPosition);
          e &&
            (t.plotDrawTip.updatePosition(e),
            t.MousePoint.updatePosition(e),
            t.plot && ((e = t.positions.concat([e])), t.plot.setPositions(e)));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.rightClickEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          0 != t.positions.length
            ? t.plot.fixPositionCount
              ? t.positions.length == t.plot.fixPositionCount
                ? (t.plot.setPositions(t.positions), t.drawEnd(), t.deactivate())
                : (t.deactivate(), t.clear())
              : t.positions.length >= t.plot.minPositionCount
              ? (t.plot.setPositions(t.positions), t.drawEnd(), t.deactivate())
              : (t.deactivate(), t.clear())
            : t.deactivate();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.unRegisterEvents = function () {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      }),
      (e.prototype.drawEnd = function () {
        this.plot.openEditMode(!1), this.PlotDrawEndEvent.raiseEvent(this.plot, this.plotType);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.GeoPlotEditor = function (e, t) {
      (this.viewer = e), (this.geoPlotLayer = t), this.initEventHandler();
    });
    (e.prototype.initEventHandler = function () {
      this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
    }),
      (e.prototype.activate = function () {
        this.deactivate(), this.initLeftClickEventHandler();
      }),
      (e.prototype.deactivate = function () {
        this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.unRegisterEvents(),
          this.clear();
      }),
      (e.prototype.clear = function () {
        this.editGeoPlot && this.editGeoPlot.openEditMode(!0), this.clearEditVertex(), this.clearMidVertex();
      }),
      (e.prototype.initLeftClickEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          e = t.viewer.scene.pick(e.position);
          e
            ? e.id && 'GeoPlot' == e.id.plotType
              ? (t.editGeoPlot && t.editGeoPlot.plotCode == e.id.plotCode) ||
                (t.handleEditGeoPlot(), t.handlePickGeoPlot(e.id))
              : t.clear()
            : t.handleEditGeoPlot();
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.handleEditGeoPlot = function () {
        this.clear();
        this.editGeoPlot;
        (this.editGeoPlot = void 0), this.isEdited && ((this.isEdited = !1), (this.isEditing = !1));
      }),
      (e.prototype.handlePickGeoPlot = function (e) {
        (this.editGeoPlot = this.geoPlotLayer.getByPlotCode(e.plotCode)),
          this.editGeoPlot &&
            ((this.isEditing = !1),
            (this.isEdited = !1),
            this.editGeoPlot.openEditMode(!0),
            (this.editPositions = this.editGeoPlot.getPositions()),
            (this.EditMoveCenterPositoin = this.getGeoPlotCenterPosition()),
            this.clear(),
            this.createEditVertex(),
            this.createMidVertex(),
            this.registerEvents());
      }),
      (e.prototype.registerEvents = function () {
        this.initLeftDownEventHandler(), this.initMouseMoveEventHandler(), this.initLeftUpEventHandler();
      }),
      (e.prototype.unRegisterEvents = function () {
        this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.initLeftDownEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          e = t.viewer.scene.pick(e.position);
          e &&
            e.id &&
            e.id.type &&
            ('GeoPlotEditVertex' == e.id.type || 'GeoPlotEditMove' == e.id.type
              ? ((t.isEditing = !0),
                (t.viewer.scene.screenSpaceCameraController.enableRotate = !1),
                (t.viewer.enableCursorStyle = !1),
                (t.viewer._element.style.cursor = ''),
                (document.body.style.cursor = 'move'),
                (t.editVertext = e.id),
                (t.editVertext.show = !1),
                t.clearMidVertex())
              : 'GeoPlotEditMidVertex' == e.id.type &&
                (t.editPositions.splice(e.id.vertexIndex, 0, e.id.position._value),
                t.editGeoPlot.setPositions(t.editPositions),
                t.clear(),
                t.createEditVertex(),
                t.createMidVertex(),
                (t.isEdited = !0)));
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      }),
      (e.prototype.initLeftUpEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          t.isEditing &&
            ((t.viewer.enableCursorStyle = !0),
            (document.body.style.cursor = 'default'),
            (t.viewer.scene.screenSpaceCameraController.enableRotate = !0),
            (t.editVertext.show = !0),
            (t.isEditing = !1),
            t.clearMidVertex(),
            t.createMidVertex(),
            'FencePlot' == t.editGeoPlot.PlotType && t.editGeoPlot.initHeights());
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
      }),
      (e.prototype.initMouseMoveEventHandler = function () {
        var i = this;
        this.eventHandler.setInputAction(function (e) {
          var t = i.viewer.scene.pickPosition(e.endPosition);
          if (t && i.isEditing) {
            if ('GeoPlotEditMove' == i.editVertext.type) {
              e = i.EditMoveCenterPositoin;
              if (!e) return;
              i.moveEntityByOffset(e, t);
            } else (i.editPositions[i.editVertext.vertexIndex] = t), i.editGeoPlot.setPositions(i.editPositions);
            (i.isEdited = !0), (i.EditMoveCenterPositoin = i.getGeoPlotCenterPosition());
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.getGeoPlotCenterPosition = function () {
        var t = [],
          i = 0;
        switch (this.editGeoPlot.properties.plotType) {
          case TMap3D.GeoPlot_PlotTypes.CIRCLE:
          case TMap3D.GeoPlot_PlotTypes.MARKER:
          case TMap3D.GeoPlot_PlotTypes.TEXT:
            return this.editPositions[0];
        }
        this.editPositions.forEach(function (e) {
          e = TMap3D.Utils.MapUtils.cartesian3ToPoint3D(e);
          t.push([e.x, e.y]), i < e.z && (i = e.z);
        });
        var e = TMap3D.Utils.MapUtils.getPointsCenter(t);
        return Cesium.Cartesian3.fromDegrees(e[0], e[1], i);
      }),
      (e.prototype.moveEntityByOffset = function (e, t) {
        for (
          var e = TMap3D.Utils.MapUtils.cartesian3ToPoint3D(e),
            t = TMap3D.Utils.MapUtils.cartesian3ToPoint3D(t),
            i = t.x - e.x,
            o = t.y - e.y,
            n = t.z - e.z,
            r = this.editGeoPlot.properties.plotType,
            s = void 0,
            a = 0;
          a < this.editPositions.length;
          a++
        )
          ((s = TMap3D.Utils.MapUtils.cartesian3ToPoint3D(this.editPositions[a])).x += i),
            (s.y += o),
            (r != TMap3D.GeoPlot_PlotTypes.CIRCLE && r != TMap3D.GeoPlot_PlotTypes.RECTANGLE) || (s.z += n),
            (this.editPositions[a] = Cesium.Cartesian3.fromDegrees(s.x, s.y, s.z));
        this.editGeoPlot.setPositions(this.editPositions);
      }),
      (e.prototype.createEditVertex = function () {
        var o = this;
        this.vertexEntities = [];
        var e = this.editGeoPlot.getPositions();
        if (this.editGeoPlot.properties.plotType == TMap3D.GeoPlot_PlotTypes.CIRCLE)
          return this.createCircleEditVertex(), void this.createEditMoveCenterEntity();
        e.forEach(function (e, t) {
          var i = o.viewer.entities.add({
            position: new Cesium.CallbackProperty(function (e) {
              return o.editPositions[t];
            }, !1),
            type: 'GeoPlotEditVertex',
            vertexIndex: t,
            point: {
              color: Cesium.Color.DARKBLUE.withAlpha(0.4),
              pixelSize: 10,
              outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
              outlineWidth: 3,
              disableDepthTestDistance: 2e3,
            },
          });
          o.vertexEntities.push(i);
        }),
          1 != this.editPositions.length && this.createEditMoveCenterEntity();
      }),
      (e.prototype.createCircleEditVertex = function () {
        var t = this,
          e = this.viewer.entities.add({
            position: new Cesium.CallbackProperty(function (e) {
              return t.editPositions[1];
            }, !1),
            type: 'GeoPlotEditVertex',
            vertexIndex: 1,
            point: {
              color: Cesium.Color.DARKBLUE.withAlpha(0.4),
              pixelSize: 10,
              outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
              outlineWidth: 3,
              disableDepthTestDistance: 2e3,
            },
          });
        this.vertexEntities.push(e);
      }),
      (e.prototype.createEditMoveCenterEntity = function () {
        var t = this;
        this.EditMoveCenterEntity = this.viewer.entities.add({
          position: new Cesium.CallbackProperty(function (e) {
            return t.EditMoveCenterPositoin;
          }, !1),
          type: 'GeoPlotEditMove',
          point: {
            color: Cesium.Color.RED.withAlpha(0.4),
            pixelSize: 10,
            outlineColor: Cesium.Color.WHITE.withAlpha(0.3),
            outlineWidth: 3,
            disableDepthTestDistance: 2e3,
          },
        });
      }),
      (e.prototype.clearEditVertex = function () {
        var t = this;
        this.vertexEntities &&
          this.vertexEntities.forEach(function (e) {
            t.viewer.entities.remove(e);
          }),
          (this.vertexEntities = []),
          this.viewer.entities.remove(this.EditMoveCenterEntity);
      }),
      (e.prototype.createMidVertex = function () {
        var e = this.editGeoPlot.properties.plotType;
        if (e != TMap3D.GeoPlot_PlotTypes.RECTANGLE && e != TMap3D.GeoPlot_PlotTypes.CIRCLE) {
          this.midVertexEntities = [];
          for (var t = 0; t < this.editPositions.length; t++) {
            var i = this.editPositions[t],
              o = this.editPositions[t + 1],
              o = TMap3D.Utils.MapUtils.midPosition(i, o),
              o = this.viewer.entities.add({
                position: o,
                type: 'GeoPlotEditMidVertex',
                vertexIndex: t + 1,
                point: {
                  color: Cesium.Color.LIMEGREEN.withAlpha(0.4),
                  pixelSize: 10,
                  outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
                  outlineWidth: 3,
                  disableDepthTestDistance: 2e3,
                },
              });
            this.midVertexEntities.push(o);
          }
        }
      }),
      (e.prototype.clearMidVertex = function () {
        var t = this;
        this.midVertexEntities &&
          this.midVertexEntities.forEach(function (e) {
            t.viewer.entities.remove(e);
          }),
          (this.midVertexEntities = []);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.MilitaryPlotDraw = function (e) {
      (this.viewer = e),
        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
        ),
        this.initEvents();
    });
    (e.prototype.activate = function (e) {
      (this.plotType = e),
        this.clear(),
        (this.points = []),
        (this.plotDrawTip = new TMap3D.Controls.PlotDrawTip(this.viewer)),
        (this.MousePoint = new TMap3D.Tools.MousePoint(this.viewer)),
        this.registerEvents(),
        (this.viewer.enableCursorStyle = !1),
        (this.viewer._element.style.cursor = 'default'),
        this.initMouseTip(),
        this.PlotDrawStartEvent.raiseEvent();
    }),
      (e.prototype.initMouseTip = function () {
        var e = this.getPlotNam(),
          t = '按下鼠标右键取消绘制',
          i = '按下鼠标左键确定第一个点的位置';
        switch (this.plotType) {
          case TMap3D.Military_PlotTypes.MARKER:
            this.plotDrawTip.setContent(['当前绘制类型：' + e + '，需要1个点', '按下鼠标左键确定位置', t]);
            break;
          case TMap3D.Military_PlotTypes.POLYLINE:
          case TMap3D.Military_PlotTypes.SQUAD_COMBAT:
          case TMap3D.Military_PlotTypes.TAILED_SQUAD_COMBAT:
            this.plotDrawTip.setContent(['当前绘制类型：' + e + '，最少需要2个点', i, t]);
            break;
          case TMap3D.Military_PlotTypes.ELLIPSE:
          case TMap3D.Military_PlotTypes.CIRCLE:
          case TMap3D.Military_PlotTypes.RECTANGLE:
          case TMap3D.Military_PlotTypes.FINE_ARROW:
          case TMap3D.Military_PlotTypes.ASSAULT_DIRECTION:
            this.plotDrawTip.setContent(['当前绘制类型：' + e + '，需要2个点', i, t]);
            break;
          case TMap3D.Military_PlotTypes.POLYGON:
          case TMap3D.Military_PlotTypes.ATTACK_ARROW:
          case TMap3D.Military_PlotTypes.TAILED_ATTACK_ARROW:
          case TMap3D.Military_PlotTypes.CLOSED_CURVE:
            this.plotDrawTip.setContent(['当前绘制类型：' + e + '，最少需要3个点', i, t]);
            break;
          case TMap3D.Military_PlotTypes.GATHERING_PLACE:
          case TMap3D.Military_PlotTypes.SECTOR:
            this.plotDrawTip.setContent(['当前绘制类型：' + e + '，需要3个点', i, t]);
            break;
          case TMap3D.Military_PlotTypes.DOUBLE_ARROW:
            this.plotDrawTip.setContent(['当前绘制类型：' + e + '，需要4个点', i, t]);
        }
      }),
      (e.prototype.getPlotNam = function () {
        switch (this.plotType) {
          case TMap3D.Military_PlotTypes.MARKER:
            return '点';
          case TMap3D.Military_PlotTypes.POLYLINE:
            return '线';
          case TMap3D.Military_PlotTypes.POLYGON:
            return '面';
          case TMap3D.Military_PlotTypes.ELLIPSE:
            return '椭圆';
          case TMap3D.Military_PlotTypes.CIRCLE:
            return '正圆';
          case TMap3D.Military_PlotTypes.RECTANGLE:
            return '矩形';
          case TMap3D.Military_PlotTypes.CLOSED_CURVE:
            return '曲线面';
          case TMap3D.Military_PlotTypes.SECTOR:
            return '扇形';
          case TMap3D.Military_PlotTypes.FINE_ARROW:
            return '直箭头';
          case TMap3D.Military_PlotTypes.ASSAULT_DIRECTION:
            return '突击方向';
          case TMap3D.Military_PlotTypes.ATTACK_ARROW:
            return '点进攻方向';
          case TMap3D.Military_PlotTypes.TAILED_ATTACK_ARROW:
            return '进攻方向尾';
          case TMap3D.Military_PlotTypes.GATHERING_PLACE:
            return '集结地';
          case TMap3D.Military_PlotTypes.SQUAD_COMBAT:
            return '分队作战';
          case TMap3D.Military_PlotTypes.TAILED_SQUAD_COMBAT:
            return '分队作战尾';
          case TMap3D.Military_PlotTypes.DOUBLE_ARROW:
            return '钳击';
        }
      }),
      (e.prototype.deactivate = function () {
        this.unRegisterEvents(),
          (this.plotType = void 0),
          (this.viewer._element.style.cursor = 'pointer'),
          (this.viewer.enableCursorStyle = !0),
          this.plotDrawTip &&
            (this.plotDrawTip.remove(),
            this.MousePoint.remove(),
            (this.plotDrawTip = void 0),
            (this.MousePoint = void 0));
      }),
      (e.prototype.clear = function () {
        this.plot && (this.plot.remove(), (this.plot = void 0));
      }),
      (e.prototype.generatePlot = function (e, t) {
        var i = TMap3D.Utils.MapUtils.getPlotCode();
        (this.plot = TMap3D.MilitaryPlot.PlotFactory.createPlot(this.viewer, this.plotType, {
          type: 'Feature',
          properties: { plotCode: i, style: { height: t } },
          geometry: { type: 'Polygon', coordinates: [e] },
        })),
          this.plot.openEditMode(!0);
      }),
      (e.prototype.initEvents = function () {
        (this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
          (this.PlotDrawStartEvent = new Cesium.Event()),
          (this.PlotDrawEndEvent = new Cesium.Event());
      }),
      (e.prototype.registerEvents = function () {
        this.leftClickEvent(), this.rightClickEvent(), this.mouseMoveEvent();
      }),
      (e.prototype.leftClickEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          i.viewer._element.style.cursor = 'default';
          var t = i.viewer.scene.pickPosition(e.position);
          if ((t = t || i.viewer.scene.camera.pickEllipsoid(e.position, i.viewer.scene.globe.ellipsoid))) {
            (e = TMap3D.Utils.MapUtils.point3dToPoint2d(t)), (t = Cesium.Cartographic.fromCartesian(t));
            if (0 == i.points.length) i.points.push(e), i.generatePlot(i.points, t.height);
            else {
              if (
                TMap3D.Utils.NormalUtils.distance(e, i.points[i.points.length - 1]) <
                TMap3D.Utils.NormalUtils.ZERO_TOLERANCE
              )
                return;
              i.points.push(e), i.plot.setPoints(i.points);
            }
            i.setMouseTipContent(), i.plot.fixPointCount == i.points.length && (i.drawEnd(), i.deactivate());
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.setMouseTipContent = function () {
        var e = this.getPlotNam();
        switch (this.plotType) {
          case TMap3D.Military_PlotTypes.POLYLINE:
          case TMap3D.Military_PlotTypes.SQUAD_COMBAT:
          case TMap3D.Military_PlotTypes.TAILED_SQUAD_COMBAT:
            this.plotDrawTip.setContent([
              '当前绘制类型：' + e + '，最少需要2个点',
              '已有' + this.points.length + '个点，按下鼠标左键确定第' + (this.points.length + 1) + '个点',
              this.points.length < 2 ? '按下鼠标右键取消绘制' : '按下鼠标右键结束绘制',
            ]);
            break;
          case TMap3D.Military_PlotTypes.ELLIPSE:
          case TMap3D.Military_PlotTypes.CIRCLE:
          case TMap3D.Military_PlotTypes.RECTANGLE:
          case TMap3D.Military_PlotTypes.FINE_ARROW:
          case TMap3D.Military_PlotTypes.ASSAULT_DIRECTION:
            this.plotDrawTip.setContent([
              '当前绘制类型：' + e + '，需要2个点',
              '已有' + this.points.length + '个点，按下鼠标左键确定第' + (this.points.length + 1) + '个点',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.Military_PlotTypes.POLYGON:
          case TMap3D.Military_PlotTypes.ATTACK_ARROW:
          case TMap3D.Military_PlotTypes.TAILED_ATTACK_ARROW:
          case TMap3D.Military_PlotTypes.CLOSED_CURVE:
            this.plotDrawTip.setContent([
              '当前绘制类型：' + e + '，最少需要3个点',
              '已有' + this.points.length + '个点，按下鼠标左键确定第' + (this.points.length + 1) + '个点',
              this.points.length < 3 ? '按下鼠标右键取消绘制' : '按下鼠标右键结束绘制',
            ]);
            break;
          case TMap3D.Military_PlotTypes.GATHERING_PLACE:
          case TMap3D.Military_PlotTypes.SECTOR:
            this.plotDrawTip.setContent([
              '当前绘制类型：' + e + '，需要3个点',
              '已有' + this.points.length + '个点，按下鼠标左键确定第' + (this.points.length + 1) + '个点',
              '按下鼠标右键取消绘制',
            ]);
            break;
          case TMap3D.Military_PlotTypes.DOUBLE_ARROW:
            this.plotDrawTip.setContent([
              '当前绘制类型：' + e + '，需要4个点',
              '已有' + this.points.length + '个点，按下鼠标左键确定第' + (this.points.length + 1) + '个点',
              '按下鼠标右键取消绘制',
            ]);
        }
      }),
      (e.prototype.mouseMoveEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          var t =
            (t = i.viewer.scene.pickPosition(e.endPosition)) ||
            i.viewer.scene.camera.pickEllipsoid(e.endPosition, i.viewer.scene.globe.ellipsoid);
          t &&
            (i.plotDrawTip.updatePosition(t),
            i.MousePoint.updatePosition(t),
            i.plot &&
              ((t = TMap3D.Utils.MapUtils.point3dToPoint2d(t)),
              TMap3D.Utils.NormalUtils.distance(t, i.points[i.points.length - 1]) <
                TMap3D.Utils.NormalUtils.ZERO_TOLERANCE || ((t = i.points.concat([t])), i.plot.setPoints(t))));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.rightClickEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          0 != t.points.length
            ? t.plot.fixPointCount
              ? t.points.length == t.plot.fixPointCount
                ? (t.plot.setPoints(t.points), t.drawEnd(), t.deactivate())
                : (t.deactivate(), t.clear())
              : t.points.length >= t.plot.minPointCount
              ? (t.plot.setPoints(t.points), t.drawEnd(), t.deactivate())
              : (t.deactivate(), t.clear())
            : t.deactivate();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.unRegisterEvents = function () {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      }),
      (e.prototype.drawEnd = function () {
        this.plot.openEditMode(!1), this.PlotDrawEndEvent.raiseEvent(this.plot, this.plotType);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.MilitaryPlotEditor = function (e, t) {
      (this.viewer = e), (this.militaryPlotLayer = t), this.initEventHandler();
    });
    (e.prototype.initEventHandler = function () {
      (this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
        (this.PlotEditEndEvent = new Cesium.Event());
    }),
      (e.prototype.activate = function () {
        this.deactivate(), this.initLeftClickEventHandler();
      }),
      (e.prototype.deactivate = function () {
        this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK), this.clear();
      }),
      (e.prototype.clear = function () {
        this.clearEditVertex();
      }),
      (e.prototype.initLeftClickEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          e = t.viewer.scene.pick(e.position);
          e && e.id && 'MilitaryPlot' == e.id.plotType
            ? (t.militaryPlot && t.militaryPlot.plotCode == e.id.plotCode) ||
              (t.handleEditMilitaryPlot(), t.handlePickMilitaryPlot(e.id))
            : t.handleEditMilitaryPlot();
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.handleEditMilitaryPlot = function () {
        this.clear();
        var e = this.militaryPlot;
        e &&
          ((this.militaryPlot = void 0),
          e.openEditMode(!1),
          this.isEdited && (this.PlotEditEndEvent.raiseEvent(e), (this.isEdited = !1), (this.isEditing = !1)));
      }),
      (e.prototype.handlePickMilitaryPlot = function (e) {
        (this.militaryPlot = this.militaryPlotLayer.getByPlotCode(e.plotCode)),
          this.militaryPlot &&
            ((this.isEditing = !1),
            (this.isEdited = !1),
            this.militaryPlot.openEditMode(!0),
            (this.editPositions = this.plotPointsToPositions()),
            (this.EditMoveCenterPositoin = this.getMilitaryPlotCenterPosition()),
            this.clear(),
            this.createEditVertex(),
            this.registerEvents());
      }),
      (e.prototype.registerEvents = function () {
        this.initLeftDownEventHandler(), this.initMouseMoveEventHandler(), this.initLeftUpEventHandler();
      }),
      (e.prototype.unRegisterEvents = function () {
        this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.initLeftDownEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          e = t.viewer.scene.pick(e.position);
          e &&
            e.id &&
            e.id.type &&
            (('MilitaryPlotEditVertex' != e.id.type && 'MilitaryPlotEditMoveVertex' != e.id.type) ||
              ((t.isEditing = !0),
              (t.viewer.scene.screenSpaceCameraController.enableRotate = !1),
              (t.viewer.enableCursorStyle = !1),
              (t.viewer._element.style.cursor = ''),
              (document.body.style.cursor = 'move'),
              (t.editVertext = e.id),
              (t.editVertext.show = !1)));
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      }),
      (e.prototype.initLeftUpEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          t.isEditing &&
            ((t.viewer.enableCursorStyle = !0),
            (document.body.style.cursor = 'default'),
            (t.viewer.scene.screenSpaceCameraController.enableRotate = !0),
            (t.editVertext.show = !0),
            (t.isEditing = !1));
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
      }),
      (e.prototype.initMouseMoveEventHandler = function () {
        var i = this;
        this.eventHandler.setInputAction(function (e) {
          var t =
            (t = i.viewer.scene.pickPosition(e.endPosition)) ||
            i.viewer.scene.camera.pickEllipsoid(e.endPosition, i.viewer.scene.globe.ellipsoid);
          if (t && i.isEditing) {
            if ('MilitaryPlotEditMoveVertex' == i.editVertext.type) {
              e = i.EditMoveCenterPositoin;
              if (!e) return;
              i.moveEntityByOffset(e, t);
            } else
              (i.editPositions[i.editVertext.vertexIndex] = t),
                i.militaryPlot.properties.plotType == TMap3D.Military_PlotTypes.MARKER &&
                  i.militaryPlot.setHeight(i.getPositionHeight(i.editPositions[0])),
                i.militaryPlot.setPoints(TMap3D.Utils.MapUtils.point3dsToPoint2ds(i.editPositions));
            (i.isEdited = !0), (i.EditMoveCenterPositoin = i.getMilitaryPlotCenterPosition());
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.getMilitaryPlotCenterPosition = function () {
        switch (this.militaryPlot.properties.plotType) {
          case TMap3D.Military_PlotTypes.CIRCLE:
          case TMap3D.Military_PlotTypes.MARKER:
            return this.editPositions[0];
        }
        var e = TMap3D.Utils.MapUtils.getPointsCenter(this.militaryPlot.getPoints());
        return Cesium.Cartesian3.fromDegrees(e[0], e[1], this.militaryPlot.getHeight());
      }),
      (e.prototype.moveEntityByOffset = function (e, t) {
        for (
          var e = TMap3D.Utils.MapUtils.cartesian3ToPoint3D(e),
            t = TMap3D.Utils.MapUtils.cartesian3ToPoint3D(t),
            i = t.x - e.x,
            o = t.y - e.y,
            n = void 0,
            r = 0;
          r < this.editPositions.length;
          r++
        )
          ((n = TMap3D.Utils.MapUtils.cartesian3ToPoint3D(this.editPositions[r])).x += i),
            (n.y += o),
            (this.editPositions[r] = Cesium.Cartesian3.fromDegrees(n.x, n.y, n.z));
        this.militaryPlot.setPoints(TMap3D.Utils.MapUtils.point3dsToPoint2ds(this.editPositions));
      }),
      (e.prototype.getPositionHeight = function (e) {
        return Cesium.Cartographic.fromCartesian(e).height;
      }),
      (e.prototype.plotPointsToPositions = function () {
        for (
          var e = this.militaryPlot.getPoints(), t = this.militaryPlot.getHeight(), i = [], o = 0;
          o < e.length;
          o++
        ) {
          var n = e[o];
          i.push(n[0]), i.push(n[1]), i.push(t);
        }
        return Cesium.Cartesian3.fromDegreesArrayHeights(i);
      }),
      (e.prototype.createEditVertex = function () {
        var o = this;
        this.vertexEntities = [];
        var e = this.plotPointsToPositions();
        if (this.militaryPlot.properties.plotName == TMap3D.Military_PlotTypes.CIRCLE)
          return this.createCircleEditVertex(), void this.createEditMoveCenterEntity();
        e.forEach(function (e, t) {
          var i = o.viewer.entities.add({
            position: new Cesium.CallbackProperty(function (e) {
              return o.editPositions[t];
            }, !1),
            type: 'MilitaryPlotEditVertex',
            vertexIndex: t,
            point: {
              color: Cesium.Color.DARKBLUE.withAlpha(0.4),
              pixelSize: 10,
              outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
              outlineWidth: 3,
              disableDepthTestDistance: 2e3,
            },
          });
          o.vertexEntities.push(i);
        }),
          1 != this.editPositions.length && this.createEditMoveCenterEntity();
      }),
      (e.prototype.createCircleEditVertex = function () {
        var t = this,
          e = this.viewer.entities.add({
            position: new Cesium.CallbackProperty(function (e) {
              return t.editPositions[1];
            }, !1),
            type: 'MilitaryPlotEditVertex',
            vertexIndex: 1,
            point: {
              color: Cesium.Color.DARKBLUE.withAlpha(0.4),
              pixelSize: 10,
              outlineColor: Cesium.Color.YELLOW.withAlpha(0.4),
              outlineWidth: 3,
              disableDepthTestDistance: 2e3,
            },
          });
        this.vertexEntities.push(e);
      }),
      (e.prototype.createEditMoveCenterEntity = function () {
        var t = this;
        this.EditMoveCenterEntity = this.viewer.entities.add({
          position: new Cesium.CallbackProperty(function (e) {
            return t.EditMoveCenterPositoin;
          }, !1),
          type: 'MilitaryPlotEditMoveVertex',
          point: {
            color: Cesium.Color.RED.withAlpha(0.4),
            pixelSize: 10,
            outlineColor: Cesium.Color.WHITE.withAlpha(0.3),
            outlineWidth: 3,
            disableDepthTestDistance: 2e3,
          },
        });
      }),
      (e.prototype.clearEditVertex = function () {
        var t = this;
        this.vertexEntities &&
          this.vertexEntities.forEach(function (e) {
            t.viewer.entities.remove(e);
          }),
          (this.vertexEntities = []),
          this.viewer.entities.remove(this.EditMoveCenterEntity);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.GltfPlotDraw = function (e) {
      (this.viewer = e), this.initEvents();
    });
    (e.prototype.initEvents = function () {
      this.DrawEndEvent = new Cesium.Event();
    }),
      (e.prototype.activate = function () {
        this.registerEvents(),
          (this.plotDrawTip = new TMap3D.Controls.PlotDrawTip(this.viewer)),
          this.plotDrawTip.setContent(['左键点击确定模型位置', '右键点击取消']),
          (this.mousePoint = new TMap3D.Tools.MousePoint(this.viewer)),
          (this.viewer.enableCursorStyle = !1),
          (this.viewer._element.style.cursor = 'default');
      }),
      (e.prototype.registerEvents = function () {
        var t = this;
        (this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
          this.initLeftClickEvent(),
          this.initMouseMoveEvent(),
          this.eventHandler.setInputAction(function (e) {
            t.deactivate();
          }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.initLeftClickEvent = function () {
        var i = this;
        this.eventHandler.setInputAction(function (e) {
          var t = i.viewer.scene.pickPosition(e.position);
          (t = t || i.viewer.scene.camera.pickEllipsoid(e.startPosition, i.viewer.scene.globe.ellipsoid)) &&
            (i.DrawEndEvent.raiseEvent(t), i.deactivate());
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.initMouseMoveEvent = function () {
        var i = this;
        this.eventHandler.setInputAction(function (e) {
          var t = i.viewer.scene.pickPosition(e.startPosition);
          (t = t || i.viewer.scene.camera.pickEllipsoid(e.startPosition, i.viewer.scene.globe.ellipsoid)) &&
            (i.plotDrawTip.updatePosition(t), i.mousePoint.updatePosition(t));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.unRegisterEvents = function () {
        this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.deactivate = function () {
        this.unRegisterEvents(),
          this.plotDrawTip.remove(),
          (this.plotDrawTip = void 0),
          this.mousePoint.remove(),
          (this.mousePoint = void 0),
          (this.viewer._element.style.cursor = 'pointer'),
          (this.viewer.enableCursorStyle = !0);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.GltfPlotEditor = function (e, t) {
      (this.viewer = e), (this.gltfPlotLayer = t), this.registerMouseEvents();
    });
    (e.prototype.registerMouseEvents = function () {
      (this.eventHandler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
        this.initLeftDownEventHandler(),
        this.initMouseMoveEventHandler(),
        this.initLeftUpEventHandler();
    }),
      (e.prototype.unRegisterMouseEvents = function () {
        this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOWN),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_UP),
          this.eventHandler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.destroy = function () {
        this.unRegisterMouseEvents(),
          (this.viewer = void 0),
          (this.gltfPlotLayer = void 0),
          (this.eventHandler = void 0);
      }),
      (e.prototype.initLeftDownEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          !t.gltfPlotLayer.selectedPlot ||
            ((e = t.viewer.scene.pick(e.position)) &&
              e.id &&
              'GltfPlot' === e.id.type &&
              t.gltfPlotLayer.selectedPlot.properties.plotCode == e.id.plotCode &&
              ((t.viewer.enableCursorStyle = !1),
              (document.body.style.cursor = 'move'),
              (t.moveing = !0),
              t.gltfPlotLayer.selectedPlot.setVisible(!1),
              (t.mousePoint = new TMap3D.Tools.MousePoint(t.viewer)),
              (t.viewer.scene.screenSpaceCameraController.enableRotate = !1)));
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);
      }),
      (e.prototype.initLeftUpEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          t.moveing &&
            ((t.viewer.enableCursorStyle = !0),
            (document.body.style.cursor = 'default'),
            (t.moveing = !1),
            (t.viewer.scene.screenSpaceCameraController.enableRotate = !0),
            t.mousePoint.remove(),
            (t.mousePoint = void 0),
            t.gltfPlotLayer.selectedPlot && t.gltfPlotLayer.selectedPlot.setVisible(!0));
        }, Cesium.ScreenSpaceEventType.LEFT_UP);
      }),
      (e.prototype.initMouseMoveEventHandler = function () {
        var t = this;
        this.eventHandler.setInputAction(function (e) {
          !t.moveing ||
            ((e = t.viewer.scene.pickPosition(e.endPosition)) &&
              (t.mousePoint.updatePosition(e), t.gltfPlotLayer.selectedPlot.updatePosition(e)));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.ViewShedDraw = function (e) {
      (this.viewer = e),
        this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
          Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
        ),
        this.initEvents();
    });
    (e.prototype.activate = function () {
      this.deactivate(),
        this.clear(),
        (this.firstPosition = void 0),
        this.registerEvents(),
        (this.viewer.enableCursorStyle = !1),
        (this.viewer._element.style.cursor = 'default');
    }),
      (e.prototype.deactivate = function () {
        this.unRegisterEvents(), (this.viewer._element.style.cursor = 'pointer'), (this.viewer.enableCursorStyle = !0);
      }),
      (e.prototype.clear = function () {
        this.cameraLine && (this.cameraLine.remove(), (this.cameraLine = void 0));
      }),
      (e.prototype.initEvents = function () {
        (this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
          (this.DrawEndEvent = new Cesium.Event());
      }),
      (e.prototype.registerEvents = function () {
        this.leftClickEvent(), this.rightClickEvent(), this.mouseMoveEvent();
      }),
      (e.prototype.leftClickEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          i.viewer._element.style.cursor = 'default';
          var t = i.viewer.scene.pickPosition(e.position);
          (t = t || i.viewer.scene.camera.pickEllipsoid(e.position, i.viewer.scene.globe.ellipsoid)) &&
            (i.firstPosition ? i.drawEnd() : (i.firstPosition = i.getFirstPosition(t)));
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.getFirstPosition = function (e) {
        var t = Cesium.Cartographic.fromCartesian(e),
          i = Cesium.Math.toDegrees(t.longitude),
          e = Cesium.Math.toDegrees(t.latitude),
          t = t.height + 1;
        return Cesium.Cartesian3.fromDegrees(i, e, t);
      }),
      (e.prototype.createCameraLine = function (e) {
        this.cameraLine = new TMap3D.CameraLine(this.viewer, { viewPosition: this.firstPosition, viewPositionEnd: e });
      }),
      (e.prototype.mouseMoveEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          i.viewer._element.style.cursor = 'default';
          var t = i.viewer.scene.pickPosition(e.endPosition);
          (t = t || i.viewer.scene.camera.pickEllipsoid(e.startPosition, i.viewer.scene.globe.ellipsoid)) &&
            i.firstPosition &&
            (i.cameraLine ? i.cameraLine.updateEndPosition(t) : i.createCameraLine(t));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.rightClickEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          t.firstPosition && t.clear(), t.deactivate();
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.unRegisterEvents = function () {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
      }),
      (e.prototype.drawEnd = function () {
        (this.viewShedStage = new TMap3D.Application.ViewShedStage(this.viewer, this.cameraLine.getOptions())),
          this.DrawEndEvent.raiseEvent(this.viewShedStage),
          this.cameraLine.remove(),
          this.deactivate();
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.MeasureArea = function (e) {
      (this.viewer = e),
        this.initEvents(),
        (this.positions = []),
        (this.tempPositions = []),
        (this.vertexEntities = []),
        (this.labelEntity = void 0),
        (this.measureArea = 0);
    });
    (e.prototype.initEvents = function () {
      (this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
        (this.MeasureStartEvent = new Cesium.Event()),
        (this.MeasureEndEvent = new Cesium.Event());
    }),
      (e.prototype.activate = function () {
        this.deactivate(),
          this.registerEvents(),
          (this.viewer.enableCursorStyle = !1),
          (this.viewer._element.style.cursor = 'default'),
          (this.isMeasure = !0),
          (this.measureArea = 0);
      }),
      (e.prototype.deactivate = function () {
        this.isMeasure &&
          (this.unRegisterEvents(),
          (this.viewer._element.style.cursor = 'pointer'),
          (this.viewer.enableCursorStyle = !0),
          (this.isMeasure = !1),
          (this.tempPositions = []),
          (this.positions = []),
          (this.height = void 0));
      }),
      (e.prototype.clear = function () {
        var t = this;
        this.viewer.entities.remove(this.polygonEntity),
          (this.polygonEntity = void 0),
          this.vertexEntities.forEach(function (e) {
            t.viewer.entities.remove(e);
          }),
          (this.vertexEntities = []),
          this.viewer.entities.remove(this.mesureResultEntity),
          (this.mesureResultEntity = void 0),
          (this.height = void 0);
      }),
      (e.prototype.createPolygonEntity = function () {
        var t = this;
        this.polygonEntity = this.viewer.entities.add({
          polygon: {
            hierarchy: new Cesium.CallbackProperty(function (e) {
              return new Cesium.PolygonHierarchy(t.tempPositions);
            }, !1),
            material: Cesium.Color.RED.withAlpha(0.4),
            perPositionHeight: !0,
          },
          polyline: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.tempPositions.concat(t.tempPositions[0]);
            }, !1),
            width: 1,
            material: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
          },
        });
      }),
      (e.prototype.createVertex = function () {
        var e = this.viewer.entities.add({
          position: this.positions[this.positions.length - 1],
          type: 'MeasureAreaVertex',
          point: { color: Cesium.Color.FUCHSIA, pixelSize: 8, disableDepthTestDistance: 500 },
        });
        this.vertexEntities.push(e);
      }),
      (e.prototype.createResultLabel = function () {
        var t = this;
        this.mesureResultEntity = this.viewer.entities.add({
          position: new Cesium.CallbackProperty(function (e) {
            return t.getCenterPosition();
          }, !1),
          type: 'MeasureAreaResult',
          label: {
            text: new Cesium.CallbackProperty(function (e) {
              return '面积' + TMap3D.Utils.MapUtils.computeArea(t.tempPositions) + '平方米';
            }, !1),
            scale: 0.5,
            font: 'normal 28px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e3),
            scaleByDistance: new Cesium.NearFarScalar(1e3, 1, 3e3, 0.4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -30),
            outlineWidth: 9,
            outlineColor: Cesium.Color.YELLOW,
          },
        });
      }),
      (e.prototype.getCenterPosition = function () {
        var t = this,
          i = [];
        if (this.tempPositions.length < 3) return this.tempPositions[0];
        this.tempPositions.forEach(function (e) {
          e = t.cartesian3ToPoint3D(e);
          i.push([e.x, e.y]);
        });
        var e = TMap3D.Utils.MapUtils.getPointsCenter(i);
        return Cesium.Cartesian3.fromDegrees(e[0], e[1], this.height + 0.3);
      }),
      (e.prototype.registerEvents = function () {
        this.leftClickEvent(), this.rightClickEvent(), this.mouseMoveEvent();
      }),
      (e.prototype.leftClickEvent = function () {
        var o = this;
        this.handler.setInputAction(function (e) {
          o.viewer._element.style.cursor = 'default';
          var t,
            i = o.viewer.scene.pickPosition(e.position);
          i || ((t = o.viewer.scene.globe.ellipsoid), (i = o.viewer.scene.camera.pickEllipsoid(e.position, t))),
            i &&
              (o.positions.push(i),
              (o.height = o.unifiedHeight(o.positions, o.height)),
              1 == o.positions.length && o.createPolygonEntity(),
              o.createVertex());
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.mouseMoveEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          var t;
          i.isMeasure &&
            ((i.viewer._element.style.cursor = 'default'),
            (t =
              (t = i.viewer.scene.pickPosition(e.endPosition)) ||
              i.viewer.scene.camera.pickEllipsoid(e.startPosition, i.viewer.scene.globe.ellipsoid)) &&
              i.handleMoveEvent(t));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.handleMoveEvent = function (e) {
        this.positions.length < 1 ||
          ((this.height = this.unifiedHeight(this.positions, this.height)),
          (this.tempPositions = this.positions.concat(e)),
          3 <= this.tempPositions.length && !this.mesureResultEntity && this.createResultLabel());
      }),
      (e.prototype.unifiedHeight = function (e, t) {
        t = t || this.getPositionHeight(e[0]);
        for (var i = 0; i < e.length; i++) {
          var o = e[i],
            n = this.cartesian3ToPoint3D(o);
          e[i] = Cesium.Cartesian3.fromDegrees(n.x, n.y, t);
        }
        return t;
      }),
      (e.prototype.getPositionHeight = function (e) {
        return Cesium.Cartographic.fromCartesian(e).height;
      }),
      (e.prototype.cartesian3ToPoint3D = function (e) {
        e = Cesium.Cartographic.fromCartesian(e);
        return { x: Cesium.Math.toDegrees(e.longitude), y: Cesium.Math.toDegrees(e.latitude), z: e.height };
      }),
      (e.prototype.rightClickEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          !t.isMeasure || t.positions.length < 3
            ? (t.deactivate(), t.clear())
            : ((t.tempPositions = [].concat(t.positions)),
              (t.polygonEntity.polyline = {
                positions: t.positions.concat(t.positions[0]),
                width: 2,
                material: Cesium.Color.YELLOW,
                depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.YELLOW }),
              }),
              (t.polygonEntity.polygon.hierarchy = new Cesium.PolygonHierarchy(t.tempPositions)),
              (t.mesureResultEntity.position = t.getCenterPosition()),
              (t.mesureResultEntity.label.text = '总面积' + TMap3D.Utils.MapUtils.computeArea(t.positions) + '平方米'),
              t.measureEnd());
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.measureEnd = function () {
        this.deactivate(), this.MeasureEndEvent.raiseEvent(this.measureArea);
      }),
      (e.prototype.unRegisterEvents = function () {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.MeasureDistance = function (e) {
      (this.viewer = e),
        this.initEvents(),
        (this.positions = []),
        (this.tempPositions = []),
        (this.vertexEntities = []),
        (this.labelEntity = void 0),
        (this.measureDistance = 0);
    });
    (e.prototype.initEvents = function () {
      (this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
        (this.MeasureStartEvent = new Cesium.Event()),
        (this.MeasureEndEvent = new Cesium.Event());
    }),
      (e.prototype.activate = function () {
        this.deactivate(),
          this.registerEvents(),
          (this.viewer.enableCursorStyle = !1),
          (this.viewer._element.style.cursor = 'default'),
          (this.isMeasure = !0),
          (this.measureDistance = 0);
      }),
      (e.prototype.deactivate = function () {
        this.isMeasure &&
          (this.unRegisterEvents(),
          (this.viewer._element.style.cursor = 'pointer'),
          (this.viewer.enableCursorStyle = !0),
          (this.isMeasure = !1),
          (this.tempPositions = []),
          (this.positions = []));
      }),
      (e.prototype.clear = function () {
        var t = this;
        this.viewer.entities.remove(this.lineEntity),
          (this.lineEntity = void 0),
          this.vertexEntities.forEach(function (e) {
            t.viewer.entities.remove(e);
          }),
          (this.vertexEntities = []);
      }),
      (e.prototype.createLineEntity = function () {
        var t = this;
        this.lineEntity = this.viewer.entities.add({
          polyline: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.tempPositions;
            }, !1),
            width: 2,
            material: Cesium.Color.YELLOW,
            depthFailMaterial: Cesium.Color.YELLOW,
          },
        });
      }),
      (e.prototype.createVertex = function () {
        var e = this.viewer.entities.add({
          position: this.positions[this.positions.length - 1],
          id: 'MeasureDistanceVertex' + this.positions[this.positions.length - 1],
          type: 'MeasureDistanceVertex',
          label: {
            text: TMap3D.Utils.MapUtils.spaceDistance(this.positions) + '米',
            scale: 0.5,
            font: 'normal 24px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e3),
            scaleByDistance: new Cesium.NearFarScalar(1e3, 1, 3e3, 0.4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -30),
            outlineWidth: 9,
            outlineColor: Cesium.Color.WHITE,
          },
          point: { color: Cesium.Color.FUCHSIA, pixelSize: 8, disableDepthTestDistance: 500 },
        });
        this.vertexEntities.push(e);
      }),
      (e.prototype.createStartEntity = function () {
        var e = this.viewer.entities.add({
          position: this.positions[0],
          type: 'MeasureDistanceVertex',
          billboard: {
            image: TMap3D.BaseUtils.getHostPath() + '/TMap/measure/start.png',
            scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          },
          point: { color: Cesium.Color.FUCHSIA, pixelSize: 6 },
        });
        this.vertexEntities.push(e);
      }),
      (e.prototype.createEndEntity = function () {
        var e = this.viewer.entities.getById('MeasureDistanceVertex' + this.positions[this.positions.length - 1]);
        this.viewer.entities.remove(e), this.viewer.entities.remove(this.moveVertexEntity);
        e = this.viewer.entities.add({
          position: this.positions[this.positions.length - 1],
          type: 'MeasureDistanceVertex',
          label: {
            text: '总距离：' + TMap3D.Utils.MapUtils.spaceDistance(this.positions) + '米',
            scale: 0.5,
            font: 'normal 26px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e3),
            scaleByDistance: new Cesium.NearFarScalar(1e3, 1, 3e3, 0.4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -50),
            outlineWidth: 9,
            outlineColor: Cesium.Color.WHITE,
            eyeOffset: new Cesium.Cartesian3(0, 0, -10),
          },
          billboard: {
            image: TMap3D.BaseUtils.getHostPath() + '/TMap/measure/end.png',
            scaleByDistance: new Cesium.NearFarScalar(300, 1, 1200, 0.4),
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 1e4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          },
          point: { color: Cesium.Color.FUCHSIA, pixelSize: 6 },
        });
        this.vertexEntities.push(e);
      }),
      (e.prototype.registerEvents = function () {
        this.leftClickEvent(), this.rightClickEvent(), this.mouseMoveEvent();
      }),
      (e.prototype.leftClickEvent = function () {
        var o = this;
        this.handler.setInputAction(function (e) {
          o.viewer._element.style.cursor = 'default';
          var t,
            i = o.viewer.scene.pickPosition(e.position);
          if (
            (i || ((t = o.viewer.scene.globe.ellipsoid), (i = o.viewer.scene.camera.pickEllipsoid(e.position, t))), i)
          ) {
            if ((o.positions.push(i), 1 == o.positions.length)) return o.createLineEntity(), void o.createStartEntity();
            o.createVertex();
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.mouseMoveEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          var t;
          i.isMeasure &&
            ((i.viewer._element.style.cursor = 'default'),
            (t =
              (t = i.viewer.scene.pickPosition(e.endPosition)) ||
              i.viewer.scene.camera.pickEllipsoid(e.startPosition, i.viewer.scene.globe.ellipsoid)) &&
              i.handleMoveEvent(t));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.handleMoveEvent = function (e) {
        this.positions.length < 1 || (this.tempPositions = this.positions.concat(e));
      }),
      (e.prototype.rightClickEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          !t.isMeasure || t.positions.length < 1
            ? (t.deactivate(), t.clear())
            : (t.createEndEntity(),
              (t.lineEntity.polyline = {
                positions: t.positions,
                width: 2,
                material: Cesium.Color.YELLOW,
                depthFailMaterial: Cesium.Color.YELLOW,
              }),
              t.measureEnd());
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.measureEnd = function () {
        this.deactivate(), this.MeasureEndEvent.raiseEvent(this.measureDistance);
      }),
      (e.prototype.unRegisterEvents = function () {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.MeasureHeight = function (e) {
      (this.viewer = e),
        this.initEvents(),
        (this.positions = []),
        (this.vertexEntities = []),
        (this.labelEntity = void 0),
        (this.measureHeight = 0);
    });
    (e.prototype.initEvents = function () {
      (this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
        (this.MeasureStartEvent = new Cesium.Event()),
        (this.MeasureEndEvent = new Cesium.Event());
    }),
      (e.prototype.activate = function () {
        this.deactivate(),
          this.registerEvents(),
          (this.viewer.enableCursorStyle = !1),
          (this.viewer._element.style.cursor = 'default'),
          (this.isMeasure = !0),
          (this.circleRadius = 0.1),
          (this.measureHeight = 0),
          (this.positions = []);
      }),
      (e.prototype.deactivate = function () {
        this.isMeasure &&
          (this.unRegisterEvents(),
          (this.viewer._element.style.cursor = 'pointer'),
          (this.viewer.enableCursorStyle = !0),
          (this.isMeasure = !1));
      }),
      (e.prototype.clear = function () {
        var t = this;
        this.viewer.entities.remove(this.lineEntity),
          (this.lineEntity = void 0),
          this.viewer.entities.remove(this.labelEntity),
          (this.labelEntity = void 0),
          this.removeCircleEntity(),
          this.vertexEntities.forEach(function (e) {
            t.viewer.entities.remove(e);
          }),
          (this.vertexEntities = []);
      }),
      (e.prototype.createLineEntity = function () {
        var t = this;
        this.lineEntity = this.viewer.entities.add({
          polyline: {
            positions: new Cesium.CallbackProperty(function (e) {
              return t.positions;
            }, !1),
            width: 2,
            material: Cesium.Color.YELLOW,
            depthFailMaterial: new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.RED }),
          },
        });
      }),
      (e.prototype.createLabel = function () {
        var t = this;
        this.labelEntity = this.viewer.entities.add({
          position: new Cesium.CallbackProperty(function (e) {
            return t.positions[t.positions.length - 1];
          }, !1),
          label: {
            text: '',
            scale: 0.5,
            font: 'normal 40px MicroSoft YaHei',
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 5e3),
            scaleByDistance: new Cesium.NearFarScalar(500, 1, 1500, 0.4),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            pixelOffset: new Cesium.Cartesian2(0, -30),
            outlineWidth: 9,
            outlineColor: Cesium.Color.WHITE,
          },
        });
      }),
      (e.prototype.createVertex = function (t) {
        var i = this,
          e = this.viewer.entities.add({
            position: new Cesium.CallbackProperty(function (e) {
              return i.positions[t];
            }, !1),
            type: 'MeasureHeightVertex',
            point: { color: Cesium.Color.FUCHSIA, pixelSize: 6 },
          });
        this.vertexEntities.push(e);
      }),
      (e.prototype.createCircleEntitiy = function () {
        var t = this;
        this.circleEntity = this.viewer.entities.add({
          position: new Cesium.CallbackProperty(function (e) {
            return t.positions[t.positions.length - 1];
          }, !1),
          ellipse: {
            height: new Cesium.CallbackProperty(function (e) {
              return TMap3D.Utils.MapUtils.getPositionHeight(t.positions[t.positions.length - 1]);
            }, !1),
            semiMinorAxis: new Cesium.CallbackProperty(function (e) {
              return t.circleRadius;
            }, !1),
            semiMajorAxis: new Cesium.CallbackProperty(function (e) {
              return t.circleRadius;
            }, !1),
            material: Cesium.Color.YELLOW.withAlpha(0.5),
          },
        });
      }),
      (e.prototype.removeCircleEntity = function () {
        this.viewer.entities.remove(this.circleEntity), (this.circleEntity = void 0);
      }),
      (e.prototype.registerEvents = function () {
        this.leftClickEvent(), this.rightClickEvent(), this.mouseMoveEvent();
      }),
      (e.prototype.leftClickEvent = function () {
        var o = this;
        this.handler.setInputAction(function (e) {
          o.viewer._element.style.cursor = 'default';
          var t,
            i = o.viewer.scene.pickPosition(e.position);
          i || ((t = o.viewer.scene.globe.ellipsoid), (i = o.viewer.scene.camera.pickEllipsoid(e.position, t))),
            i &&
              (0 == o.positions.length
                ? (o.positions.push(i),
                  o.createVertex(0),
                  o.createLineEntity(),
                  o.createCircleEntitiy(),
                  o.createLabel())
                : o.measureEnd());
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
      }),
      (e.prototype.mouseMoveEvent = function () {
        var i = this;
        this.handler.setInputAction(function (e) {
          var t;
          i.isMeasure &&
            ((i.viewer._element.style.cursor = 'default'),
            (t =
              (t = i.viewer.scene.pickPosition(e.endPosition)) ||
              i.viewer.scene.camera.pickEllipsoid(e.startPosition, i.viewer.scene.globe.ellipsoid)) &&
              i.handleMoveEvent(t));
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      }),
      (e.prototype.handleMoveEvent = function (e) {
        var t, i, o;
        this.positions.length < 1 ||
          ((t = TMap3D.Utils.MapUtils.cartesian3ToCoordinates(this.positions[0])),
          (i = (o = TMap3D.Utils.MapUtils.cartesian3ToCoordinates(e))[2] - t[2]),
          (t[2] = o[2]),
          (o = Cesium.Cartesian3.fromDegrees(t[0], t[1], o[2])),
          this.positions.length < 2
            ? (this.positions.push(o), this.createVertex(1))
            : ((this.positions[1] = o),
              (this.measureHeight = i.toFixed(3)),
              (this.labelEntity.label.text = '高度：' + this.measureHeight + ' 米')),
          (this.circleRadius = TMap3D.Utils.MapUtils.getDistanceH(this.positions[0], e)));
      }),
      (e.prototype.rightClickEvent = function () {
        var t = this;
        this.handler.setInputAction(function (e) {
          t.isMeasure && (t.deactivate(), t.clear());
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
      }),
      (e.prototype.measureEnd = function () {
        this.deactivate(), this.MeasureEndEvent.raiseEvent(this.measureHeight);
      }),
      (e.prototype.unRegisterEvents = function () {
        this.handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK),
          this.handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
      });
  })(),
  (function () {
    var e = (TMap3D.Tools.TilesClip = function (e) {
      this.viewer = e;
    });
    (e.prototype.add = function (e, t) {
      (this.tiles = t), this.clear(), this.booleanClockwise(e) && (e = e.reverse()), this.addClippingPlanes(e);
    }),
      (e.prototype.addClippingPlanes = function (e) {
        for (var t = this.getInverseTransform(this.tiles), i = e.length, o = [], n = 0; n < i; ++n) {
          var r = e[n],
            s = e[(n + 1) % i],
            a = this.createPlane(r, s, t);
          o.push(a);
        }
        this.tiles.clippingPlanes = new Cesium.ClippingPlaneCollection({
          planes: o,
          edgeWidth: 1,
          edgeColor: Cesium.Color.WHITE,
        });
      }),
      (e.prototype.getInverseTransform = function (e) {
        var t = void 0,
          i = e.root.transform,
          t =
            (i && i.equals(Cesium.Matrix4.IDENTITY)) || !i
              ? Cesium.Transforms.eastNorthUpToFixedFrame(e.boundingSphere.center)
              : Cesium.Matrix4.fromArray(e.root.transform);
        return Cesium.Matrix4.inverseTransformation(t, new Cesium.Matrix4());
      }),
      (e.prototype.getOriginCoordinateSystemPoint = function (e, t) {
        return Cesium.Matrix4.multiplyByPoint(t, e, new Cesium.Cartesian3(0, 0, 0));
      }),
      (e.prototype.createPlane = function (e, t, i) {
        (e = this.getOriginCoordinateSystemPoint(e, i)),
          (t = this.getOriginCoordinateSystemPoint(t, i)),
          (i = new Cesium.Cartesian3(0, 0, 10)),
          (t = Cesium.Cartesian3.subtract(t, e, new Cesium.Cartesian3())),
          (i = Cesium.Cartesian3.cross(t, i, new Cesium.Cartesian3())),
          (i = Cesium.Cartesian3.normalize(i, i)),
          (i = Cesium.Plane.fromPointNormal(e, i));
        return Cesium.ClippingPlane.fromPlane(i);
      }),
      (e.prototype.booleanClockwise = function (e) {
        var t = this,
          i = [];
        e.map(function (e) {
          i.push(t.cartesian3ToDegrees(e));
        }),
          i.push(i[0]);
        e = turf_min.lineString(i);
        return turf_min.booleanClockwise(e);
      }),
      (e.prototype.cartesian3ToDegrees = function (e) {
        e = Cesium.Cartographic.fromCartesian(e);
        return [Cesium.Math.toDegrees(e.longitude), Cesium.Math.toDegrees(e.latitude)];
      }),
      (e.prototype.clear = function () {
        this.tiles &&
          (this.tiles.clippingPlanes = new Cesium.ClippingPlaneCollection({
            planes: [],
            edgeWidth: 1,
            edgeColor: Cesium.Color.WHITE,
          }));
      });
  })(),
  (function () {
    var e = (TMap3D.Scenes.ReflectScene = function (e) {
      (this.viewer = e), this._init();
    });
    (e.prototype._init = function () {
      (this.wfStage = new Cesium.PostProcessStage({ fragmentShader: this.getScene_fs() })),
        this.viewer.scene.postProcessStages.add(this.wfStage);
    }),
      (e.prototype.closeEffects = function () {
        this.wfStage && (this.viewer.scene.postProcessStages.remove(this.wfStage), (this.wfStage = void 0));
      }),
      (e.prototype.show = function (e) {
        (this._show = e), (this.wfStage.enable = this._show);
      }),
      (e.prototype.getScene_fs = function () {
        return '#extension GL_OES_standard_derivatives : enable\nuniform sampler2D colorTexture;\nuniform sampler2D depthTexture;\nvarying vec2 v_textureCoordinates;\nvec4 toEye(in vec2 uv, in float depth){\n    vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n    vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\n    posInCamera =posInCamera / posInCamera.w;\n    return posInCamera;\n}\nfloat getDepth(in vec4 depth){\n    float z_window = czm_unpackDepth(depth);\n    z_window = czm_reverseLogDepth(z_window);\n    float n_range = czm_depthRange.near;\n    float f_range = czm_depthRange.far;\n    return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n}\nvec3 guussColor(vec2 uv){\n    vec2 pixelSize = 1.0 / czm_viewport.zw;\n    float dx0 = -pixelSize.x;\n    float dy0 = -pixelSize.y;\n    float dx1 = pixelSize.x;\n    float dy1 = pixelSize.y;\n    vec4 gc = (\n        texture2D(colorTexture, uv)+\n        texture2D(colorTexture, uv + vec2(dx0, dy0)) +\n        texture2D(colorTexture, uv + vec2(0.0, dy0)) +\n        texture2D(colorTexture, uv + vec2(dx1, dy0)) +\n        texture2D(colorTexture, uv + vec2(dx0, 0.0)) +\n        texture2D(colorTexture, uv + vec2(dx1, 0.0)) +\n        texture2D(colorTexture, uv + vec2(dx0, dy1)) +\n        texture2D(colorTexture, uv + vec2(0.0, dy1)) +\n        texture2D(colorTexture, uv + vec2(dx1, dy1))\n    ) * (1.0 / 9.0);\n    return gc.rgb;\n}\nvoid main(){\n    // mat4 dither = mat4(\n    //     0,       0.5,    0.125,  0.625,\n    //     0.75,    0.25,   0.875,  0.375,\n    //     0.1875,  0.6875, 0.0625, 0.5625,\n    //     0.9375,  0.4375, 0.8125, 0.3125\n    // );\n    // int sampleCoordX = int(mod((gl_FragCoord.x * v_textureCoordinates.x),4.0));\n    // int sampleCoordY = int(mod((gl_FragCoord.y * v_textureCoordinates.y),4.0));\n    float offset = 0.0;\n    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n    vec4 currD = texture2D(depthTexture, v_textureCoordinates);\n    // gl_FragColor = currD;\n    // return;\n    if(currD.r>=1.0){\n        gl_FragColor = color;\n        return;\n    }\n    float depth = getDepth(currD);\n    // gl_FragColor = vec4(depth,0.0,0.0,1.0);\n    // return;\n    vec4 positionEC = toEye(v_textureCoordinates, depth);\n    vec3 dx = dFdx(positionEC.xyz);\n    vec3 dy = dFdy(positionEC.xyz);\n    vec3 normal = normalize(cross(dx,dy));\n    vec4 positionWC = normalize(czm_inverseView * positionEC);\n    vec3 normalWC = normalize(czm_inverseViewRotation * normal);\n    float fotNumWC = dot(positionWC.xyz,normalWC);\n    if(fotNumWC<=0.5){\n        gl_FragColor = color;\n        return;\n    }\n// float dotNum = dot(normal,vec3(0.0,1.0,0.0));\n// gl_FragColor = mix(color,vec4(1.0),dotNum*0.8);\n// return;\nvec3 viewDir = normalize(positionEC.xyz);\nvec3 reflectDir = reflect(viewDir, normal);\n// vec3 viewReflectDir = czm_viewRotation * reflectDir;\nvec3 viewReflectDir = reflectDir;\nfloat step = 0.05;\nint stepNum = int(20.0 / step);\nvec3 pos;\nvec3 albedo;\nbool jd = false;\nfor(int i = 1;i <= 400;i++)\n{\nfloat delta = step * float(i) + offset;\npos = positionEC.xyz + viewReflectDir * delta;\nfloat d = -pos.z;\nvec4 tmp = czm_projection * vec4(pos,1.0);\nvec3 screenPos = tmp.xyz / tmp.w;\nvec2 uv = vec2(screenPos.x, screenPos.y) * 0.5 + vec2(0.5, 0.5);\nif(uv.x > 0.0 && uv.x < 1.0 && uv.y > 0.0 && uv.y < 1.0){\n    float dd = getDepth(texture2D(depthTexture, uv));\n    vec4 jzc = toEye(uv, dd);\n    dd = -jzc.z;\n    if(d>dd){\n        if(abs(abs(d) - abs(dd)) <=step){\n            jd = true;\n            // albedo = texture2D(colorTexture, uv).rgb;\n            albedo = guussColor(uv);\n         }\n            break;\n        }\n    }\n }\nif(jd){\n    gl_FragColor = vec4(mix(color.xyz,albedo,0.5),1.0);\n}else{\n    gl_FragColor = color;\n}\n}';
      });
  })(),
  (function () {
    function t(e) {
      var t;
      if (Cesium.defined(e) && e instanceof Array && 4 == e.length)
        return (
          e[0] > e[2] && ((t = e[0]), (e[0] = e[2]), (e[2] = t)),
          e[1] > e[3] && ((t = e[1]), (e[1] = e[3]), (e[3] = t)),
          (e[0] = Math.max(e[0], -180)),
          (e[2] = Math.min(e[2], 180)),
          (e[1] = Math.max(e[1], -90)),
          (e[3] = Math.min(e[3], 90)),
          e
        );
    }
    var e = (TMap3D.Scenes.Rain = function (e) {
      (e = Cesium.defaultValue(e, Cesium.defaultValue.EMPTY_OBJECT)),
        (this.visibleHeight = Cesium.defaultValue(e.visibleHeight, 5e3)),
        (this.visibleHeight = Math.min(0, this.visibleHeight)),
        (this.visibleHeight = Math.max(5e4, this.visibleHeight)),
        (this.density = Cesium.defaultValue(e.density, 0.5)),
        (this.density = Math.max(0, this.density)),
        (this.density = Math.min(1, this.density)),
        (this.url = Cesium.defaultValue(e.url, void 0)),
        (this.scope = Cesium.defaultValue(e.scope, [-180, -90, 180, 90])),
        (this.scope = t(this.scope)),
        (this.show = Cesium.defaultValue(e.visible, !0)),
        (this.type = 'rain'),
        (this.viewer = void 0);
      e = {
        type: 1,
        visibleHeight: this.visibleHeight,
        density: this.density,
        url: this.url,
        maxParticlesPerCell: e.maxParticlesPerCell,
        show: this.show,
        scope: this.scope,
      };
      this.primitive = new Cesium.FePrecipitation(e);
    });
    (e.prototype.getPrimitive = function () {
      return this.primitives;
    }),
      (e.prototype.setMap = function (e) {
        this.viewer = e;
      }),
      (e.prototype.getMap = function () {
        return this.viewer;
      }),
      (e.prototype.setVisible = function (e) {
        (this.show = e), (this.primitive.show = e);
      }),
      (e.prototype.getVisible = function () {
        return this.show;
      }),
      (e.prototype.setDensity = function (e) {
        (this.density = e), (this.primitive.density = e);
      }),
      (e.prototype.getDensity = function () {
        return this.density;
      }),
      (e.prototype.setScope = function (e) {
        (this.scope = e), (this.scope = t(this.scope)), (this.primitive.scope = this.scope);
      }),
      (e.prototype.getScope = function () {
        return this.scope;
      }),
      (e.prototype.getType = function () {
        return this.type;
      });
    e = TMap3D.Scenes.Snow = function (e) {
      (e = Cesium.defaultValue(e, Cesium.defaultValue.EMPTY_OBJECT)),
        (this.visibleHeight = Cesium.defaultValue(e.visibleHeight, 5e3)),
        (this.visibleHeight = Math.min(0, this.visibleHeight)),
        (this.visibleHeight = Math.max(5e4, this.visibleHeight)),
        (this.density = Cesium.defaultValue(e.density, 0.7)),
        (this.density = Math.max(0, this.density)),
        (this.density = Math.min(1, this.density)),
        (this.reverse = Cesium.defaultValue(e.reverse, !1)),
        (this.url = Cesium.defaultValue(e.url, void 0)),
        (this.scope = Cesium.defaultValue(e.scope, [-180, -90, 180, 90])),
        (this.scope = t(this.scope)),
        (this.show = Cesium.defaultValue(e.show, !0)),
        (this.type = 'snow'),
        (this.viewer = void 0);
      e = {
        type: 0,
        visibleHeight: this.visibleHeight,
        density: this.density,
        url: this.url,
        show: this.show,
        maxParticlesPerCell: e.maxParticlesPerCell,
        reverse: this.reverse,
        scope: this.scope,
      };
      this.primitive = new Cesium.FePrecipitation(e);
    };
    (e.prototype.getPrimitive = function () {
      return this.primitives;
    }),
      (e.prototype.setMap = function (e) {
        this.viewer = e;
      }),
      (e.prototype.getMap = function () {
        return this.viewer;
      }),
      (e.prototype.setVisible = function (e) {
        (this.show = e), (this.primitive.show = e);
      }),
      (e.prototype.getVisible = function () {
        return this.show;
      }),
      (e.prototype.setDensity = function (e) {
        (this.density = e), (this.primitive.density = e);
      }),
      (e.prototype.getDensity = function () {
        return this.density;
      }),
      (e.prototype.setScope = function (e) {
        (this.scope = e), (this.scope = t(this.scope)), (this.primitive.scope = this.scope);
      }),
      (e.prototype.setReverse = function (e) {
        (this.reverse = e), (this.primitive.reverse = e);
      }),
      (e.prototype.getReverse = function () {
        return this.reverse;
      }),
      (e.prototype.getScope = function () {
        return this.scope;
      }),
      (e.prototype.getType = function () {
        return this.type;
      });
  })(),
  (function () {
    var e = (TMap3D.Scenes.WeatherManager = function (e, t) {
      (this.viewer = e),
        (this.scene = this.viewer.scene),
        (this.scene.fog.enabled = !1),
        (this.rain = null),
        (this.snow = null),
        (this.windField = null),
        (this.oceanShow = !1),
        (this.oceanArea = null),
        (this.heatMap = null),
        (this.tilt = null),
        (this.atmosphereVisible = !0),
        (this.skyBoxVisible = !0),
        (this.options = t || {});
      var i = this;
      this.removeListener = this.viewer.scene.camera.changed.addEventListener(function () {
        i.oceanArea &&
          i.oceanShow &&
          (16e5 <=
          (function (e) {
            if (e) {
              e = Cesium.Cartographic.fromCartesian(e);
              if (Cesium.defined(e))
                return [
                  parseFloat(Cesium.Math.toDegrees(e.longitude)),
                  parseFloat(Cesium.Math.toDegrees(e.latitude)),
                  e.height,
                ];
            }
          })(i.scene.camera.position)[2]
            ? i.setOceanVisible(!1)
            : i.setOceanVisible(!0));
      }, this);
    });
    (e.prototype.setGroundAtmosphereVisible = function (e) {
      this.scene.globe.showGroundAtmosphere = e;
    }),
      (e.prototype.getGroundAtmosphereVisible = function () {
        return this.scene.globe.showGroundAtmosphere;
      }),
      (e.prototype.setRainVisible = function (e) {
        this.rain || ((this.rain = new TMap3D.Scenes.Rain({})), this.scene.primitives.add(this.rain.primitive)),
          this.rain.setVisible(e);
      }),
      (e.prototype.getRainVisible = function () {
        return void 0 !== this.rain && this.rain.getVisible();
      }),
      (e.prototype.setSnowVisible = function (e) {
        this.snow ||
          ((this.snow = new TMap3D.Scenes.Snow({
            url: this.options.snowURL || TMap3D.BaseUtils.getHostPath() + '/TMap/snow.png',
            maxParticlesPerCell: this.options.maxParticlesPerCell,
          })),
          this.scene.primitives.add(this.snow.primitive)),
          this.snow.setVisible(e);
      }),
      (e.prototype.getSnowVisible = function () {
        return void 0 !== this.snow && this.snow.getVisible();
      }),
      (e.prototype.setFogVisible = function (e, t) {
        (t = t || []),
          (this.fogByDistance = Cesium.defaultValue(t.fogByDistance, new Cesium.Cartesian4(10, 0, 1e3, 0.9))),
          (this.fogColor = Cesium.defaultValue(t.color, Cesium.Color.WHITE));
        var i = this;
        this.fogTage ||
          ((this.fogTage = new Cesium.PostProcessStage({
            fragmentShader: this.getFog_fs(),
            uniforms: {
              fogByDistance: function () {
                return i.fogByDistance;
              },
              fogColor: function () {
                return i.fogColor;
              },
            },
          })),
          this.viewer.scene.postProcessStages.add(this.fogTage)),
          (this.fogTage.enabled = e);
      }),
      (e.prototype.getFog_fs = function () {
        return 'float getDistance(sampler2D depthTexture, vec2 texCoords)\n{ \n    float depth = czm_unpackDepth(texture2D(depthTexture, texCoords)); \n    if (depth == 0.0) { \n        return czm_infinity; \n    } \n    vec4 eyeCoordinate = czm_windowToEyeCoordinates(gl_FragCoord.xy, depth); \n    return -eyeCoordinate.z / eyeCoordinate.w; \n} \nfloat interpolateByDistance(vec4 nearFarScalar, float distance) \n{ \n    float startDistance = nearFarScalar.x; \n    float startValue = nearFarScalar.y; \n    float endDistance = nearFarScalar.z; \n    float endValue = nearFarScalar.w; \n    float t = clamp((distance - startDistance) / (endDistance - startDistance), 0.0, 1.0); \n    return mix(startValue, endValue, t); \n} \nvec4 alphaBlend(vec4 sourceColor, vec4 destinationColor) \n{ \n    return sourceColor * vec4(sourceColor.aaa, 1.0) + destinationColor * (1.0 - sourceColor.a); \n} \nuniform sampler2D colorTexture;\nuniform sampler2D depthTexture;\nuniform vec4 fogByDistance;\nuniform vec4 fogColor;\nvarying vec2 v_textureCoordinates;\nvoid main(void)\n{ \n    float distance = getDistance(depthTexture, v_textureCoordinates);\n    vec4 sceneColor = texture2D(colorTexture, v_textureCoordinates);\n    float blendAmount = interpolateByDistance(fogByDistance, distance);\n    vec4 finalFogColor = vec4(fogColor.rgb, fogColor.a * blendAmount); \n    gl_FragColor = alphaBlend(finalFogColor, sceneColor); \n} \n';
      });
  })(),
  (function () {
    var e = (TMap3D.Scenes.SnowCover = function (e, t) {
      (this.viewer = e),
        (t = t || {}),
        (this.alpha = Cesium.defaultValue(t.alpha, 1)),
        (this._show = Cesium.defaultValue(t.show, !0)),
        (this._maxHeight = Cesium.defaultValue(t.maxHeight, 9e3)),
        this.init();
    });
    (e.prototype.init = function () {
      var e = this;
      (this.postStage = new Cesium.PostProcessStage({
        name: 'SnowCover',
        fragmentShader: this.getSnowCoverfs(),
        uniforms: {
          alpha: function () {
            return e.alpha;
          },
        },
      })),
        (this.postStage.enabled = this._show),
        this.viewer.scene.postProcessStages.add(this.postStage),
        this.viewer.scene.camera.changed.addEventListener(this.camera_changedHandler, this);
    }),
      (e.prototype.camera_changedHandler = function () {
        this.viewer.camera.positionCartographic.height < this._maxHeight
          ? (this.postStage.enabled = this._show)
          : (this.postStage.enabled = !1);
      }),
      (e.prototype.destroy = function () {
        for (var e in (this.viewer.camera.changed.removeEventListener(this.camera_changedHandler, this),
        this.viewer.scene.postProcessStages.remove(this.postStage),
        this))
          delete this[e];
      }),
      Object.defineProperty(e.prototype, 'show', {
        get: function () {
          return this._show;
        },
        set: function (e) {
          (this._show = e), (this.postStage.enabled = e);
        },
      }),
      (e.prototype.getSnowCoverfs = function () {
        return '#extension GL_OES_standard_derivatives : enable\nuniform sampler2D colorTexture;\nuniform sampler2D depthTexture;\nuniform float alpha;\nvarying vec2 v_textureCoordinates;\nvec4 toEye(in vec2 uv, in float depth){\n    vec2 xy = vec2((uv.x * 2.0 - 1.0),(uv.y * 2.0 - 1.0));\n    vec4 posInCamera =czm_inverseProjection * vec4(xy, depth, 1.0);\n    posInCamera =posInCamera / posInCamera.w;\n    return posInCamera;\n}\nfloat getDepth(in vec4 depth){\n    float z_window = czm_unpackDepth(depth);\n    z_window = czm_reverseLogDepth(z_window);\n    float n_range = czm_depthRange.near;\n    float f_range = czm_depthRange.far;\n    return (2.0 * z_window - n_range - f_range) / (f_range - n_range);\n}\nvoid main(){\n    vec4 color = texture2D(colorTexture, v_textureCoordinates);\n    vec4 currD = texture2D(depthTexture, v_textureCoordinates);\n    if(currD.r>=1.0){\n        gl_FragColor = color;\n        return;\n    }\n    float depth = getDepth(currD);\n    vec4 positionEC = toEye(v_textureCoordinates, depth);\n    vec3 dx = dFdx(positionEC.xyz);\n    vec3 dy = dFdy(positionEC.xyz);\n    vec3 nor = normalize(cross(dx,dy));\n    vec4 positionWC = normalize(czm_inverseView * positionEC);\n    vec3 normalWC = normalize(czm_inverseViewRotation * nor);\n    float dotNumWC = dot(positionWC.xyz,normalWC);\n    if(dotNumWC<=0.3){\n        gl_FragColor = mix(color,vec4(1.0),alpha*0.3);\n        return;\n    }\n    gl_FragColor = mix(color,vec4(1.0),dotNumWC*alpha);\n}';
      });
  })(),
  (function () {
    var e = (TMap3D.FlyManager.ViewPoint = function (e) {
      var t;
      (this.viewer = e.viewer),
        this.viewer instanceof Cesium.Viewer
          ? ((t = TMap3D.Utils.MapUtils.getPlotCode()),
            (this.id = Cesium.defaultValue(e.id, 'viewPoint_RandomID_' + t)),
            (this.name = Cesium.defaultValue(e.name, this.id)),
            (this.position = Cesium.defaultValue(e.position, void 0)),
            (this.screenshotWidth = Cesium.defaultValue(e.screenshotWidth, 90)),
            (this.screenshotHeight = Cesium.defaultValue(e.screenshotHeight, 60)),
            this.position instanceof Array &&
              (this.position = Cesium.Cartesian3.fromDegrees(this.position[0], this.position[1], this.position[2])),
            (this.hpr = Cesium.defaultValue(e.hpr, void 0)),
            !this.position &&
              this.viewer &&
              (this.position = this.viewer.camera._positionWC.clone(new Cesium.Cartesian3())),
            !this.hpr &&
              this.viewer &&
              (this.hpr = [
                Cesium.Math.toDegrees(this.viewer.camera.heading) % 360,
                Cesium.Math.toDegrees(this.viewer.camera.pitch) % 360,
                Cesium.Math.toDegrees(this.viewer.camera.roll) % 360,
              ]),
            (this.time = Cesium.defaultValue(e.time, 5)),
            (this.viewPointPicture = Cesium.defaultValue(e.viewPointPicture, void 0)),
            (this.readyPromise = Cesium.when.defer()),
            this.viewPointPicture ? this.readyPromise.resolve(this.viewPointPicture) : this.creatScenePicture())
          : console.error("the constrctor of ViewPoint must have the paramter 'Cesium Viewer'");
    });
    (e.prototype.creatScenePicture = function () {
      var s = this.viewer.scene.context,
        a = s.drawingBufferWidth,
        l = s.drawingBufferHeight,
        h = this.screenshotWidth,
        u = this.screenshotHeight,
        e = new ArrayBuffer(a * l * 4),
        c = new Uint8Array(e, 0),
        p = new Uint8ClampedArray(e, 0),
        d = this,
        m = this.viewer.scene.postRender.addEventListener();
      m = this.viewer.scene.postRender.addEventListener(function (e, t, i) {
        s._gl.readPixels(0, 0, a, l, s._gl.RGBA, s._gl.UNSIGNED_BYTE, c);
        var o = document.createElement('canvas'),
          n = new ImageData(p, a, l);
        (o.width = h), (o.height = u);
        var r = o.getContext('2d');
        createImageBitmap(n, { imageOrientation: 'flipY', premultiplyAlpha: 'none' }).then(
          function (e) {
            r.scale(h / a, u / l),
              r.drawImage(e, 0, 0),
              (d.viewPointPicture = o.toDataURL('image/jpeg')),
              m.call(),
              d.readyPromise.resolve(d.viewPointPicture);
          },
          function (e) {
            d.readyPromise.reject(e);
          },
        );
      });
    }),
      (e.prototype.getHpr = function () {
        return this.hpr;
      }),
      (e.prototype.getID = function () {
        return this.id;
      }),
      (e.prototype.getName = function () {
        return this.name;
      }),
      (e.prototype.getPosition = function () {
        return this.position;
      }),
      (e.prototype.getTime = function () {
        return this.time;
      }),
      (e.prototype.getViewPointPicture = function () {
        this.viewPointPicture;
      }),
      (e.prototype.locate = function () {
        this.viewer.camera.flyTo({
          destination: this.position,
          orientation: {
            heading: Cesium.Math.toRadians(this.getHpr()[0]),
            pitch: Cesium.Math.toRadians(this.getHpr()[1]),
            roll: Cesium.Math.toRadians(this.getHpr()[2]),
          },
          duration: 1,
          complete: function () {},
        });
      }),
      (e.prototype.setHpr = function (e) {
        e instanceof Array && 3 == e.length && (this.hpr = e);
      }),
      (e.prototype.setName = function (e) {
        this.name = e;
      }),
      (e.prototype.setPosition = function (e) {
        e instanceof Cesium.Cartesian3
          ? (this.position = e.clone(new Cesium.Cartesian3()))
          : e instanceof Array && 3 == e.length && (this.position = Cesium.Cartesian3.fromDegrees(e[0], e[1], e[2]));
      }),
      (e.prototype.setTime = function (e) {
        'number' == typeof e && (this.time = e);
      });
  })(),
  (function () {
    var e = (TMap3D.FlyManager.ViewPath = function (e) {
      var t = TMap3D.Utils.MapUtils.getPlotCode();
      (this.viewer = e.viewer),
        (this.id = Cesium.defaultValue(e.id, 'viewPath_RandomID_' + t)),
        (this.name = Cesium.defaultValue(e.name, this.id)),
        (this.viewArr = new Array());
    });
    (e.prototype.addViewPoint = function (e) {
      return (
        !e && this.viewer && (e = new TMap3D.FlyManager.ViewPoint({ viewer: this.viewer })), this.viewArr.push(e), e
      );
    }),
      (e.prototype.getID = function () {
        return this.id;
      }),
      (e.prototype.getName = function () {
        return this.name;
      }),
      (e.prototype.getViewPointByID = function (t) {
        if ('string' == typeof t)
          return this.viewArr.find(function (e) {
            return e.id == t;
          });
      }),
      (e.prototype.getViewPointIndexByID = function (t) {
        if ('string' == typeof t)
          return this.viewArr.findIndex(function (e) {
            return e.id == t;
          });
      }),
      (e.prototype.modify = function (e, t) {
        void 0 !== t && this.viewArr[t] && (this.viewArr[t] = e);
      }),
      (e.prototype.removeViewPoint = function (e) {
        var t;
        'string' == typeof e
          ? -1 < (t = this.getViewPointIndexByID(e)) && this.viewArr.splice(t, 1)
          : e instanceof TMap3D.FlyManager.ViewPoint && this.removeViewPoint(e.getID());
      }),
      (e.prototype.setName = function (e) {
        this.name = e;
      });
  })(),
  (function () {
    var e = (TMap3D.FlyManager.ViewFlight = function (e) {
      var c, p;
      (this.viewer = (e = e || {}).viewer),
        this.viewer instanceof Cesium.Viewer
          ? ((this.viewPathArr = Cesium.defaultValue(e.viewPathArr, new Array())),
            (this.curPath = this.viewPathArr[0] || void 0),
            (this.active = !1),
            (this.lastPauseAllTime = 0),
            (this.freeHprMode = Cesium.defaultValue(e.freeHprMode, !1)),
            (this.positiveOrder = Cesium.defaultValue(e.positiveOrder, !0)),
            (this.positionProperty = new Cesium.SampledPositionProperty()),
            this.positionProperty.setInterpolationOptions({
              interpolationDegree: 1,
              interpolationAlgorithm: Cesium.LinearApproximation,
            }),
            (this.callBack = Cesium.defaultValue(e.callBack, void 0)),
            (this.callBackComplete = !0),
            (c = this),
            (p = new Cesium.JulianDate()),
            (this.framEventID = this.viewer.scene.preUpdate.addEventListener(function (e, t) {
              if (c.active) {
                var i = c.positionProperty._property._times;
                if (((n = i.length), !(n <= 0))) {
                  if (
                    (0 < c.lastPauseAllTime && (t = Cesium.JulianDate.addSeconds(t, -c.lastPauseAllTime, p)),
                    Cesium.JulianDate.greaterThan(i[0], t) || Cesium.JulianDate.lessThan(i[n - 1], t))
                  )
                    return !c.callBackComplete && c.callBack && c.callBack(), void (c.callBackComplete = !0);
                  var o,
                    s,
                    a,
                    l,
                    h,
                    u = c.positionProperty.getValue(t);
                  (r = void 0),
                    c.freeHprMode
                      ? (r = [c.curHeading, c.curPitch, 0])
                      : ((o = (function (e, t, i) {
                          for (var o, n, r = 0, s = e.length - 1, a = Number.MAX_VALUE, l = void 0; r <= s; )
                            if ((n = i(t, e[(o = ~~((r + s) / 2))])) < 0) {
                              var h = Math.abs(n);
                              h <= a && ((a = h), (l = o)), (r = 1 + o);
                            } else {
                              if (!(0 < n)) return o;
                              s = o - 1;
                            }
                          return l;
                        })(
                          i,
                          t,
                          c.positiveOrder
                            ? function (e, t) {
                                return Cesium.JulianDate.secondsDifference(t, e);
                              }
                            : function (e, t) {
                                return Cesium.JulianDate.secondsDifference(e, t);
                              },
                        )),
                        Cesium.defined(o) &&
                          (r =
                            Cesium.JulianDate.equals(t, i[0]) || Cesium.JulianDate.equals(t, i[i.length - 1])
                              ? c.curPath.viewArr[o].hpr
                              : ((s = 1),
                                (s = c.positiveOrder ? 1 : -1),
                                (a = c.curPath.viewArr[o].hpr),
                                (l = c.curPath.viewArr[o + s].hpr),
                                (h = c.curPath.viewArr[o + s].time),
                                (h = 1 - (s * Cesium.JulianDate.secondsDifference(i[o + s], t)) / h),
                                c.smoothTrans(a, l, h, c.positiveOrder)))),
                    r
                      ? c.viewer.camera.setView({
                          destination: u,
                          orientation: {
                            heading: Cesium.Math.toRadians(r[0]),
                            pitch: Cesium.Math.toRadians(r[1]),
                            roll: Cesium.Math.toRadians(r[2]),
                          },
                        })
                      : c.viewer.camera.setView({
                          destination: u,
                          orientation: {
                            heading: c.viewer.camera.heading,
                            pitch: c.viewer.camera.pitch,
                            roll: c.viewer.camera.roll,
                          },
                        });
                }
              }
            })),
            (this.leftDownFlag = !1),
            (this.curHeading = 0),
            (this.curPitch = 0),
            (this.curRoll = 0),
            (this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas)),
            this.handler.setInputAction(function (e) {
              c.leftDownFlag = !0;
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN),
            this.handler.setInputAction(function (e) {
              var t;
              c.leftDownFlag &&
                ((t = (e.endPosition.x - e.startPosition.x) / c.viewer.canvas.clientWidth),
                (c.curHeading += 100 * t),
                (e = (e.endPosition.y - e.startPosition.y) / c.viewer.canvas.clientHeight),
                (c.curPitch -= 70 * e));
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE),
            this.handler.setInputAction(function (e) {
              c.leftDownFlag = !1;
            }, Cesium.ScreenSpaceEventType.LEFT_UP))
          : console.error('the options.viewer is not the Cesium Viewer');
    });
    (e.prototype.addViewPath = function (e) {
      e instanceof TMap3D.FlyManager.ViewPath && (this.viewPathArr.push(e), this.curPath || (this.curPath = e));
    }),
      (e.prototype.deleteAllViewPath = function () {
        (this.curPath = void 0), (this.viewPathArr = []);
      }),
      (e.prototype.deleteViewPath = function (t) {
        t instanceof TMap3D.FlyManager.ViewPath && t == this.curPath && (this._pause(), (this.curPath = void 0));
        var e = this.viewPathArr.findIndex(function (e) {
          return e == t;
        });
        -1 < e && this.viewPathArr.splice(e, 1);
      }),
      (e.prototype.destroy = function () {
        this.reset(), this.deleteAllViewPath(), this.framEventID.call(), this.handler.destroy();
      }),
      (e.prototype.fly = function (e) {
        (this.callBackComplete || (e instanceof TMap3D.FlyManager.ViewPath && e != this.curPath)) &&
          (this.flying ? (this.flying ? this.viewer.camera.cancelFlight() : this._pause()) : this._changePathFly(e));
      }),
      (e.prototype.getAllViewPath = function () {
        return this.viewPathArr;
      }),
      (e.prototype.getFreeeHprMode = function () {
        return this.freeHprMode;
      }),
      (e.prototype.getViewPathByID = function (t) {
        return this.viewPathArr.find(function (e) {
          return e.id == t;
        });
      }),
      (e.prototype.reset = function () {
        this.active = !1;
      }),
      (e.prototype.setCurViewPath = function (e) {
        e instanceof TMap3D.FlyManager.ViewPath &&
          (this.getViewPathByID(e.getID()) || this.addViewPath(e), (this.curPath = e));
      }),
      (e.prototype.setFreeHprMode = function (e) {
        this.freeHprMode = !!e;
      }),
      (e.prototype.smoothTrans = function (e, t, i, o) {
        return (
          this._to0_360(e),
          this._to0_360(t),
          [
            this._genMinAngleTrans(e[0], t[0], i, o),
            this._genMinAngleTrans(e[1], t[1], i, o),
            this._genMinAngleTrans(e[2], t[2], i, o),
          ]
        );
      }),
      (e.prototype._changePathFly = function (e) {
        var t;
        (this.active = !1),
          e instanceof TMap3D.FlyManager.ViewPath && this.setCurViewPath(e),
          this.curPath
            ? (((t = this).flying = !0),
              this.viewer.camera.flyTo({
                destination: this.curPath.viewArr[0].getPosition(),
                orientation: {
                  heading: Cesium.Math.toRadians(this.curPath.viewArr[0].getHpr()[0]),
                  pitch: Cesium.Math.toRadians(this.curPath.viewArr[0].getHpr()[1]),
                  roll: Cesium.Math.toRadians(this.curPath.viewArr[0].getHpr()[2]),
                },
                duration: 2,
                complete: function () {
                  (t.flying = !1), t._updatePositionProperty(), t._reset(), (t.active = !0);
                },
                cancel: function () {
                  (t.flying = !1), t.callBack(), (t.callBackComplete = !0);
                },
              }))
            : console.error('缺少飞行路径，请构建飞行路径(ViewPath)');
      }),
      (e.prototype._genMinAngleTrans = function (e, t, i, o) {
        o || ((r = t), (t = e), (e = r));
        var r = Math.abs(e - t);
        return (
          (n = 1),
          r <= 180 && e <= t
            ? (n = 1)
            : 180 < r && t < e
            ? ((r = 360 - r), (n = 1))
            : r <= 180 && t < e
            ? (n = -1)
            : 180 < r && e <= t && ((r = 360 - r), (n = -1)),
          e + r * n * i
        );
      }),
      (e.prototype._pause = function () {
        this.active
          ? (this.pauseBeginTime = this.viewer.clock.currentTime)
          : (this.pauseBeginTime &&
              (this.lastPauseAllTime += Cesium.JulianDate.secondsDifference(
                this.viewer.clock.currentTime,
                this.pauseBeginTime,
              )),
            (this.pauseBeginTime = void 0)),
          (this.active = !this.active);
      }),
      (e.prototype.pause = function () {
        this._pause();
      }),
      (e.prototype._reset = function () {
        (this.pauseBeginTime = void 0), (this.callBackComplete = !1), (this.lastPauseAllTime = 0);
      }),
      (e.prototype._to0_360 = function (e) {
        e.forEach(function (e) {
          for (; e < 0; ) e += 360;
        });
      }),
      (e.prototype._updatePositionProperty = function () {
        var i,
          o = this;
        (this.positionProperty = new Cesium.SampledPositionProperty()),
          this.curPath instanceof TMap3D.FlyManager.ViewPath &&
            ((i = 0),
            this.curPath.viewArr.forEach(function (e, t) {
              0 == t
                ? (o.positionProperty.addSample(o.viewer.clock.currentTime, e.position),
                  (o.curHeading = e.hpr[0]),
                  (o.curPitch = e.hpr[1]))
                : ((i += e.time),
                  o.positionProperty.addSample(
                    Cesium.JulianDate.addSeconds(o.viewer.clock.currentTime, i, new Cesium.JulianDate()),
                    e.position,
                  ));
            }, this));
      });
  })(),
  (function () {
    var e = (TMap3D.Scene = function (e, t) {
      (this.wkt = new TMap3D.Utils.WKT()),
        (this.visualizer = e),
        (this.lands = []),
        (this.greens = []),
        (this.basePosition = this.visualizer._center),
        (this.baseHight = t || 0),
        (this.baseLonLat = TMap3D.Utils.MapUtils.cartesian3ToLonLat(this.basePosition)),
        (this.coordHelper = new TMap3D.Utils.CoordinatesHelper());
    });
    (e.prototype.load = function (e) {
      var o = this;
      fetch('/tmapdataservice/scene/' + e)
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          var t = JSON.parse(e.data.sceneInfo);
          t.plane && o.createPlane(t.plane, t.grounds || []),
            t.grounds && o.createGround(t.grounds),
            o.loadBuildings(t.models, t.buildings),
            o.loadOutRooms(t.models, t.outRoom),
            o.loadAppliances(t.models, t.appliances),
            o.createTrees(t.models, t.tree);
          for (var i = 0; i < t.walls.length; i++) o.createWall(t.walls[i]);
          for (i = 0; i < t.water.length; i++) o.addWaterRegion(t.water[i]);
        })
        .catch(function (e) {
          console.log(e);
        });
    }),
      (e.prototype.createPlane = function (e, t) {
        for (
          var i = new THREE.MeshLambertMaterial({ color: e.color || 2236962, transparent: !0, side: THREE.DoubleSide }),
            o = this.wkt.read(e.geometry),
            n = [],
            r = 0;
          r < o.length - 2;
          r += 2
        ) {
          var s = this.getXY(o[r], o[r + 1]),
            a = new THREE.Vector2(s.x, s.y);
          n.push(a);
        }
        for (var l = [], h = 0; h < t.length; h++) {
          for (var u = this.wkt.read(t[h].landGeometry), c = [], r = 0; r < u.length - 2; r += 2) {
            (s = this.getXY(u[r], u[r + 1])), (a = new THREE.Vector2(s.x, s.y));
            c.push(a);
          }
          l.push(c);
        }
        for (var p = new THREE.BufferGeometry(), d = [], m = [], f = [], h = 0; h < n.length; h++) f.push(n[h]);
        for (h = 0; h < l.length; h++) for (r = 0; r < l[h].length; r++) f.push(l[h][r]);
        for (var y = THREE.ShapeUtils.triangulateShape(n, l), h = 0; h < y.length; h++) {
          var v = y[h];
          d.push(f[v[0]].x, f[v[0]].y, 0.1),
            d.push(f[v[1]].x, f[v[1]].y, 0.1),
            d.push(f[v[2]].x, f[v[2]].y, 0.1),
            m.push(0, 0, 1),
            m.push(0, 0, 1),
            m.push(0, 0, 1);
        }
        p.addGroup(0, d.length / 3, 0);
        e = new Float32Array(d.length);
        e.set(d), p.setAttribute('position', new THREE.BufferAttribute(e, 3));
        e = new Float32Array(m.length);
        e.set(m),
          p.setAttribute('normal', new THREE.BufferAttribute(e, 3)),
          (this.mesh = new THREE.Mesh(p, [i])),
          (this.mesh.rotation.x = -Math.PI / 2),
          this.mesh.position.set(0, this.baseHight, 0),
          this.visualizer.add(this.mesh);
      }),
      (e.prototype.getXY = function (e, t) {
        var i = Cesium.Cartesian3.fromDegrees(e, this.baseLonLat[1]),
          o = Cesium.Cartesian3.fromDegrees(this.baseLonLat[0], t);
        return {
          x: Cesium.Cartesian3.distance(this.basePosition, i) * (e >= this.baseLonLat[0] ? 1 : -1),
          y: Cesium.Cartesian3.distance(this.basePosition, o) * (t >= this.baseLonLat[1] ? 1 : -1),
        };
      }),
      (e.prototype.getExtent = function (e) {
        for (var t = 180, i = -180, o = 90, n = -90, r = 0; r < e.length; r++)
          for (var s = this.wkt.read(e[r].landGeometry), a = 0; a < s.length; a += 2)
            t > s[a] && (t = s[a]),
              i < s[a] && (i = s[a]),
              o > s[a + 1] && (o = s[a + 1]),
              n < s[a + 1] && (n = s[a + 1]);
        var l = this.getXY(t, o),
          h = this.getXY(i, n);
        return { minx: l.x, miny: l.y, maxx: h.x, maxy: h.y };
      }),
      (e.prototype.getMaterial = function (e, t) {
        (t =
          -1 < e.imageURL.indexOf('/')
            ? e.imageURL
            : (t ? '/tmapdataservice/resources/img/texture/land/' : '/tmapdataservice/resources/img/texture/grass/') +
              e.imageURL),
          (t = new THREE.TextureLoader().load(t));
        return (
          (t.wrapS = t.wrapT = THREE.RepeatWrapping),
          t.repeat.set(e.uv[0], e.uv[0]),
          (t.rotation = e.rotation ? (e.rotation / 180) * Math.PI : 0),
          new THREE.MeshStandardMaterial({
            color: e.color || 10066329,
            map: t,
            transparent: !0,
            side: THREE.DoubleSide,
          })
        );
      }),
      (e.prototype.createGround = function (e) {
        for (
          var t = new THREE.MeshStandardMaterial({ color: 4473924, transparent: !0, side: THREE.DoubleSide }),
            i = this.getExtent(e),
            o = 0;
          o < e.length;
          o++
        ) {
          var n = this.getMaterial(e[o].landImage, !0);
          e[o].grassImage.imageURL || (e[o].grassImage.imageURL = 'texture1.jpg');
          for (
            var r = this.getMaterial(e[o].grassImage, !1), s = this.wkt.read(e[o].landGeometry), a = [], l = 0;
            l < s.length - 2;
            l += 2
          ) {
            var h = this.getXY(s[l], s[l + 1]),
              u = new THREE.Vector2(h.x, h.y);
            a.push(u);
          }
          for (var c = [], l = 0; l < e[o].grassGeometries.length; l++) {
            for (var p = this.wkt.read(e[o].grassGeometries[l]), d = [], m = 0; m < p.length - 2; m += 2) {
              (h = this.getXY(p[m], p[m + 1])), (u = new THREE.Vector2(h.x, h.y));
              d.push(u);
            }
            c.push(d);
          }
          var f = this._initVecs(a, c, 0.2, i.minx, i.miny, i.maxx, i.maxy),
            r = new THREE.Mesh(f, [n, r, t]);
          (r.rotation.x = -Math.PI / 2), r.position.set(0, this.baseHight, 0), this.visualizer.add(r);
        }
      }),
      (e.prototype._initVecs = function (e, t, i, o, n, r, s) {
        var a = new THREE.BufferGeometry();
        a.clearGroups();
        for (var l = Math.max(r - o, s - n), h = [], u = [], c = [], p = [], d = 0; d < e.length; d++) p.push(e[d]);
        for (d = 0; d < t.length; d++) for (var m = 0; m < t[d].length; m++) p.push(t[d][m]);
        for (var f = THREE.ShapeUtils.triangulateShape(e, t), d = 0; d < f.length; d++) {
          var y = f[d];
          h.push(p[y[0]].x, p[y[0]].y, i),
            h.push(p[y[1]].x, p[y[1]].y, i),
            h.push(p[y[2]].x, p[y[2]].y, i),
            u.push(0, 0, 1),
            u.push(0, 0, 1),
            u.push(0, 0, 1),
            c.push((p[y[0]].x - o) / l, (p[y[0]].y - n) / l),
            c.push((p[y[1]].x - o) / l, (p[y[1]].y - n) / l),
            c.push((p[y[2]].x - o) / l, (p[y[2]].y - n) / l);
        }
        a.addGroup(0, h.length / 3, 0);
        for (s = h.length / 3, m = 0; m < t.length; m++)
          for (var v = t[m], C = THREE.ShapeUtils.triangulateShape(v, []), d = 0; d < C.length; d++) {
            y = C[d];
            h.push(v[y[0]].x, v[y[0]].y, i),
              h.push(v[y[1]].x, v[y[1]].y, i),
              h.push(v[y[2]].x, v[y[2]].y, i),
              u.push(0, 0, 1),
              u.push(0, 0, 1),
              u.push(0, 0, 1),
              c.push((v[y[0]].x - o) / l, (v[y[0]].y - n) / l),
              c.push((v[y[1]].x - o) / l, (v[y[1]].y - n) / l),
              c.push((v[y[2]].x - o) / l, (v[y[2]].y - n) / l);
          }
        a.addGroup(s, h.length / 3 - s, 1), (s = h.length / 3), e.push(e[0]);
        for (var g, w, d = 0; d < e.length - 1; d++) {
          var E = d + 1,
            P =
              ((g = e[E].x - e[d].x),
              { x: (w = e[E].y - e[d].y) / Math.sqrt(g * g + w * w), y: -g / Math.sqrt(g * g + w * w), z: 0 });
          h.push(e[d].x, e[d].y, 0 + i),
            h.push(e[E].x, e[E].y, 0),
            h.push(e[d].x, e[d].y, 0),
            u.push(P.x, P.y, P.z),
            u.push(P.x, P.y, P.z),
            u.push(P.x, P.y, P.z),
            c.push(1, 1),
            c.push(0, 0),
            c.push(0, 1),
            h.push(e[d].x, e[d].y, 0 + i),
            h.push(e[E].x, e[E].y, 0 + i),
            h.push(e[E].x, e[E].y, 0),
            u.push(P.x, P.y, P.z),
            u.push(P.x, P.y, P.z),
            u.push(P.x, P.y, P.z),
            c.push(1, 1),
            c.push(1, 0),
            c.push(0, 0);
        }
        a.addGroup(s, h.length / 3 - s, 2);
        s = new Float32Array(h.length);
        s.set(h),
          a.setAttribute('position', new THREE.BufferAttribute(s, 3)),
          (ns = new Float32Array(u.length)),
          ns.set(u),
          a.setAttribute('normal', new THREE.BufferAttribute(ns, 3));
        s = new Float32Array(c.length);
        return s.set(c), a.setAttribute('uv', new THREE.BufferAttribute(s, 2)), a;
      }),
      (e.prototype.loadBuildings = function (e, t) {
        for (var i = 0; i < t.length; i++) {
          var o = '/tmapdataservice/models/{modelID}/{modelID}.gltf'
              .replace('{modelID}', e[t[i].modelIndex])
              .replace('{modelID}', e[t[i].modelIndex]),
            n = new MeshVisModel({ url: o, cull: !0, editable: !0 }),
            o = this.getXY(t[i].position[0], t[i].position[1]);
          this.visualizer.add(n),
            (n.xyz = [o.x, o.y, t[i].position[2] + 0.2 + this.baseHight]),
            (n.rotation = t[i].rotation),
            (n.scale = t[i].scale),
            (n.userData = t[i]),
            n.readyPromise.then((e) => {
              (e.root.dataType = 'building'),
                (e.root.userData = e.userData),
                e.root.position.set(e.xyz[0], e.xyz[1], e.xyz[2]),
                e.root.scale.set(e.scale[0], e.scale[2], e.scale[1]),
                e.root.rotateX(Math.PI / 2),
                e.root.rotateX(e.rotation[1]),
                e.root.rotateY(e.rotation[2]),
                e.root.rotateZ(e.rotation[0]);
            });
        }
      }),
      (e.prototype.loadAppliances = function (e, t) {
        for (var i = 0; i < t.length; i++) {
          var o = '/tmapdataservice/models/{modelID}/{modelID}.gltf'
              .replace('{modelID}', e[t[i].modelIndex])
              .replace('{modelID}', e[t[i].modelIndex]),
            n = new MeshVisModel({ url: o, cull: !0, editable: !0 }),
            o = this.getXY(t[i].position[0], t[i].position[1]);
          this.visualizer.add(n),
            (n.xyz = [o.x, o.y, t[i].position[2] + 0.2 + this.baseHight]),
            (n.rotation = t[i].rotation),
            (n.scale = t[i].scale),
            (n.userData = t[i]),
            n.readyPromise.then((e) => {
              (e.root.dataType = 'appliance'),
                (e.root.userData = e.userData),
                e.root.scale.set(e.scale[1], e.scale[2], e.scale[0]),
                e.root.position.set(e.xyz[0], e.xyz[1], e.xyz[2]),
                e.root.rotation.set(-e.rotation[0], -e.rotation[1], e.rotation[2]),
                e.root.rotateX(Math.PI / 2);
            });
        }
      }),
      (e.prototype.createWall = function (e) {
        var t = -1 < e.image.indexOf('/') ? e.image : '/tmapdataservice/resources/img/texture/wall/' + e.image;
        e.width_height = e.width_height || [1, 1];
        t = new THREE.TextureLoader().load(t);
        (t.wrapS = t.wrapT = THREE.RepeatWrapping), (t.rotation = -Math.PI / 2), t.repeat.set(1, 1);
        for (
          var i = new THREE.MeshStandardMaterial({ map: t, transparent: !0, alphaTest: 0.3, side: THREE.DoubleSide }),
            o = 0;
          o < e.geomtries.length;
          o++
        ) {
          var n = new THREE.BufferGeometry(),
            r = this._setPolyLine(e.geomtries[o], e.height, e.width_height),
            s = new Float32Array(r.vertices.length);
          s.set(r.vertices), n.setAttribute('position', new THREE.BufferAttribute(s, 3));
          s = new Float32Array(r.normals.length);
          s.set(r.normals), n.setAttribute('normal', new THREE.BufferAttribute(s, 3));
          s = new Float32Array(r.uvs.length);
          s.set(r.uvs), n.setAttribute('uv', new THREE.BufferAttribute(s, 2));
          n = new THREE.Mesh(n, i);
          (n.rotation.x = -Math.PI / 2), n.position.set(0, this.baseHight, 0), this.visualizer.add(n);
        }
      }),
      (e.prototype._setPolyLine = function (e, t, i) {
        for (var o = this.wkt.read(e), n = [], r = 0; r < o.length - 1; r += 2) {
          var s = this.getXY(o[r], o[r + 1]),
            s = [s.x, s.y, 0];
          n.push(s);
        }
        return this._initWallVecs(n, t, i);
      }),
      (e.prototype._initWallVecs = function (e, t, i) {
        for (var o, n, r = { vertices: [], normals: [], uvs: [] }, s = 0; s < e.length - 1; s++) {
          var a = s,
            l = a + 1,
            h =
              ((Math.sqrt((e[l][0] - e[a][0]) * (e[l][0] - e[a][0]) + (e[l][1] - e[a][1]) * (e[l][1] - e[a][1])) / t) *
                i[1]) /
              i[0],
            a =
              ((o = e[l][0] - e[s][0]),
              { x: (n = e[l][1] - e[s][1]) / Math.sqrt(o * o + n * n), y: -o / Math.sqrt(o * o + n * n), z: 0 });
          r.vertices.push(e[s][0], e[s][1], e[s][2] + t),
            r.vertices.push(e[l][0], e[l][1], e[l][2]),
            r.vertices.push(e[s][0], e[s][1], e[s][2]),
            r.normals.push(a.x, a.y, a.z),
            r.normals.push(a.x, a.y, a.z),
            r.normals.push(a.x, a.y, a.z),
            r.uvs.push(i[1], h),
            r.uvs.push(0, 0),
            r.uvs.push(0, h),
            r.vertices.push(e[s][0], e[s][1], e[s][2] + t),
            r.vertices.push(e[l][0], e[l][1], e[l][2] + t),
            r.vertices.push(e[l][0], e[l][1], e[l][2]),
            r.normals.push(a.x, a.y, a.z),
            r.normals.push(a.x, a.y, a.z),
            r.normals.push(a.x, a.y, a.z),
            r.uvs.push(i[1], h),
            r.uvs.push(i[1], 0),
            r.uvs.push(0, 0);
        }
        return r;
      }),
      (e.prototype.loadOutRooms = function (e, t) {
        for (var i = 0; i < t.length; i++) {
          var o = '/tmapdataservice/models/{modelID}/{modelID}.gltf'
              .replace('{modelID}', e[t[i].modelIndex])
              .replace('{modelID}', e[t[i].modelIndex]),
            n = new MeshVisModel({ url: o, cull: !0, editable: !0 }),
            o = this.getXY(t[i].position[0], t[i].position[1]);
          this.visualizer.add(n),
            (n.xyz = [o.x, o.y, t[i].position[2] + 0.2 + this.baseHight]),
            (n.rotation = t[i].rotation),
            (n.scale = t[i].scale),
            n.readyPromise.then((e) => {
              e.root.position.set(e.xyz[0], e.xyz[1], e.xyz[2]),
                e.root.scale.set(e.scale[0], e.scale[2], e.scale[1]),
                e.root.rotateX(Math.PI / 2),
                e.root.rotateX(e.rotation[1]),
                e.root.rotateY(e.rotation[2]),
                e.root.rotateZ(e.rotation[0]);
            });
        }
      }),
      (e.prototype.createTrees = function (r, e) {
        for (
          var s = '/tmapdataservice/models/{modelID}/{modelID}.gltf', h = new THREE.GLTFLoader(), u = this, t = 0;
          t < e.length;
          t++
        )
          !(function (a) {
            for (var l = [], e = [], n = 0; n < a.models.length; n++) {
              var t = new Promise(function (t, e) {
                var i = a.models[n],
                  o = s.replace('{modelID}', r[i]).replace('{modelID}', r[i]);
                h.load(
                  o,
                  function (e) {
                    t({ index: i, model: e.scene });
                  },
                  void 0,
                  void 0,
                  function () {
                    t({ index: i, model: null });
                  },
                );
              });
              e.push(t);
            }
            Promise.all(e).then(function (e) {
              for (var t, i = 0; i < a.treeGeometries.length; i++)
                'POLYLINE' === a.type && ((t = u.wkt.read(a.treeGeometries[i])), l.push(t));
              for (var o, n = [], i = 0; i < a.models.length; i++)
                for (var r = 0; r < e.length; r++)
                  if (a.models[i] === e[r].index) {
                    var s = e[r].model;
                    s && n.push(s);
                    break;
                  }
              n.length &&
                ((o = u.createPoints(l, a.type, a.split, a.side)),
                ((o = u._createGeometry(o, n)).rotation.x = -Math.PI / 2),
                o.position.set(0, u.baseHight, 0),
                u.visualizer.add(o));
            });
          })(e[t]);
      }),
      (e.prototype._createGeometry = function (e, t) {
        for (var i = new THREE.BufferGeometry(), o = [], n = 0; n < t.length; n++) {
          for (var r = this._getMeshforObj(t[n]), s = {}, a = 0; a < r.length; a++)
            s[r[a].material.uuid]
              ? s[r[a].material.uuid].geometry.push(r[a].geometry)
              : (s[r[a].material.uuid] = { material: r[a].material, geometry: [r[a].geometry] });
          o.push(s);
        }
        for (var l = [], h = {}, u = {}, c = {}, n = 0; n < e.length; n++) {
          p = this.getXY(e[n].lon, e[n].lat);
          for (var d = p.x, m = p.y, s = o[n % o.length], a = 0, f = Object.keys(s); a < f.length; a++)
            for (var y = f[a], v = 0; v < s[y].geometry.length; v++) {
              var C = s[y].geometry[v].clone();
              C.rotateX(-Math.PI / 2),
                C.rotateY(-Math.PI),
                e[n].angle && C.rotateZ(Math.PI + e[n].angle),
                C.translate(d, m, 0.2);
              var g = C.getAttribute('position').array,
                w = C.getAttribute('normal').array;
              h[y] || ((h[y] = []), l.push(s[y].material)), u[y] || (u[y] = []), c[y] || (c[y] = []);
              var E = null;
              C.getAttribute('uv') && (E = C.getAttribute('uv').array);
              for (var P = C.index.array, M = 0; M < P.length; M++)
                h[y].push(g[3 * P[M]], g[3 * P[M] + 1], g[3 * P[M] + 2]),
                  u[y].push(w[3 * P[M]], w[3 * P[M] + 1], w[3 * P[M] + 2]),
                  E ? c[y].push(E[2 * P[M]], E[2 * P[M] + 1]) : c[y].push(0, 0);
            }
        }
        for (var T = [], A = [], _ = [], D = 0, x = 0, n = 0, f = Object.keys(h); n < f.length; n++) {
          for (y = f[n], a = 0; a < h[y].length; a++) T.push(h[y][a]);
          for (a = 0; a < u[y].length; a++) A.push(u[y][a]);
          for (a = 0; a < c[y].length; a++) _.push(c[y][a]);
          i.addGroup(D, T.length / 3 - D, x), x++, (D = T.length / 3);
        }
        var S = new Float32Array(T.length);
        S.set(T), i.setAttribute('position', new THREE.BufferAttribute(S, 3));
        S = new Float32Array(A.length);
        S.set(A), i.setAttribute('normal', new THREE.BufferAttribute(S, 3));
        S = new Float32Array(_.length);
        return S.set(_), i.setAttribute('uv', new THREE.BufferAttribute(S, 2)), new THREE.Mesh(i, l);
      }),
      (e.prototype._getMeshforObj = function (e) {
        var o = [];
        return (
          (function e(t) {
            if (t.children.length)
              for (var i = 0; i < t.children.length; i++)
                'Mesh' === t.children[i].type ? o.push(t.children[i]) : e(t.children[i]);
          })(e),
          o
        );
      }),
      (e.prototype.createPoints = function (e, t, i, o) {
        if ('POINT' === t) return e;
        if ('POLYLINE' !== t) return [];
        for (var n = [], r = 0; r < e.length; r++) {
          var s = e[r];
          n.push.apply(n, this._calculateSeg(s, i, o));
        }
        return n;
      }),
      (e.prototype._calculateSeg = function (e, t, i) {
        for (var o = [], n = 0, r = 0; r < e.length - 2; r += 2) {
          var s = TMap3D.T.helper.webMoctorJW2PM(e[r], e[r + 1]),
            a = TMap3D.T.helper.webMoctorJW2PM(e[r + 2], e[r + 3]),
            l = Math.atan((a.lat - s.lat) / (a.lon - s.lon));
          if (
            (a.lon - s.lon < 0 && (l -= Math.PI),
            (l += Math.PI / 2),
            i && (l += Math.PI),
            (h = Math.sqrt((s.lon - a.lon) * (s.lon - a.lon) + (s.lat - a.lat) * (s.lat - a.lat))) < n)
          )
            n -= h;
          else {
            (s.lon = ((a.lon - s.lon) * n) / h + s.lon), (s.lat = ((a.lat - s.lat) * n) / h + s.lat);
            for (
              var h = Math.sqrt((s.lon - a.lon) * (s.lon - a.lon) + (s.lat - a.lat) * (s.lat - a.lat)),
                u = Math.floor(h / t),
                c = 0;
              c < u;
              c++
            ) {
              (per = c / u),
                (x = parseFloat((a.lon - s.lon) * per) + parseFloat(s.lon)),
                (y = parseFloat((a.lat - s.lat) * per) + parseFloat(s.lat));
              var p = TMap3D.T.helper.inverseMercator(x, y);
              (p.angle = l), o.push(p);
            }
          }
        }
        return o;
      }),
      (e.prototype.addWaterRegion = function (e) {
        for (
          var t = e.geometry, e = e.height + 0.2, i = this.wkt.read(t), o = new THREE.Shape(), n = [], r = 0;
          r < i.length;
          r += 2
        ) {
          var s = this.getXY(i[r], i[r + 1]);
          n.push([s.x, s.y, 0]);
        }
        for (var a = [], r = 0; r < n.length; r++)
          0 == r ? o.moveTo(n[r][0], n[r][1]) : o.lineTo(n[r][0], n[r][1]), a.push(n[r][0], n[r][1], 0);
        var t = new THREE.ShapeBufferGeometry(o),
          l = new THREE.Water(t, {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load(
              TMap3D.BaseUtils.getHostPath() + '/TMap/water/waternormals.jpg',
              function (e) {
                e.wrapS = e.wrapT = THREE.RepeatWrapping;
              },
            ),
            alpha: 1,
            distortionScale: 0.5,
            waterColor: 3383004,
          });
        (l.rotation.x = -Math.PI / 2),
          l.position.set(0, e + this.baseHight, 0),
          this.visualizer.add(l),
          (function e() {
            (l.material.uniforms.time.value += 0.2 / 60), requestAnimationFrame(e);
          })();
      });
  })(),
  (function () {
    var e = (TMap3D.SceneManager = function (e, t) {
      (this.visualizer = e), (this.baseHight = t), (this._scenes = {});
    });
    (e.prototype.addScene = function (e) {
      var t = new TMap3D.Scene(this.visualizer, this.baseHight);
      return t.load(e), (this._scenes[e] = t);
    }),
      (e.prototype.removeScene = function (e) {});
  })();

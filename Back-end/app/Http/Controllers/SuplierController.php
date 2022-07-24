<?php

namespace App\Http\Controllers;

use App\Models\Suplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;

class SuplierController extends Controller
{

    public function index()
    {
        //
        $supliers = Suplier::all();
        $response = [
            'success' => true,
            'message' => 'list suplier',
            'response' => Response::HTTP_OK,
            'data' => $supliers
        ];
        // return response()->json($response);
        return response()->json($response, Response::HTTP_OK);
    }


    public function store(Request $request)
    {
        //
        $validator = Validator::make($request->all(), [
            'nama_suplier' => ['required'],
            'alamat_suplier' => ['required'],
            'telp_suplier'  => ['required', 'numeric']
        ]);

        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'response' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'data' => ''
            ];
            // return response()->json($response);
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $suplier = Suplier::create([
                'nama_suplier' => $request->nama_suplier,
                'alamat_suplier' => $request->alamat_suplier,
                'telp_suplier' => $request->telp_suplier,
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaksi Berhasil',
                'data'    => $suplier
            ];
            // return response()->json($response);
            return response()->json($response, Response::HTTP_OK);
        }
    }


    public function show($id)
    {
        //
        $suplier = Suplier::find($id);
        $response = [
            'success' => true,
            'message' => 'list suplier',
            'response' => Response::HTTP_OK,
            'data' => $suplier
        ];
        // return response()->json($response);
        return response()->json($response, Response::HTTP_OK);
    }


    public function update(Request $request, $id)
    {
        //
        $validator = Validator::make($request->all(), [
            'nama_suplier' => ['required'],
            'alamat_suplier' => ['required'],
            'telp_suplier'  => ['required', 'numeric']
        ]);
        if ($validator->fails()) {
            $response = [
                'success' => false,
                'message' => $validator->errors(),
                'response' => Response::HTTP_UNPROCESSABLE_ENTITY,
                'data' => ''
            ];
            // return response()->json($response);
            return response()->json($response, Response::HTTP_UNPROCESSABLE_ENTITY);
        } else {
            $suplier = Suplier::find($id);
            $suplier->update([
                'nama_suplier' => $request->nama_suplier,
                'alamat_suplier' => $request->alamat_suplier,
                'telp_suplier' => $request->telp_suplier,
            ]);
            $response    = [
                'success' => true,
                'message' => 'Transaksi Berhasil',
                'response' => Response::HTTP_OK,
                'data'    => $suplier
            ];
            // return response()->json($response);
            return response()->json($response, Response::HTTP_OK);
        }
    }


    public function destroy($id)
    {
        //
        $suplier = Suplier::find($id)->delete();
        $response    = [
            'success' => true,
            'message' => 'Data Berhasil Dihapus',
            'response' => Response::HTTP_OK,
            'data'    => ''
        ];
        // return response()->json($response);
        return response()->json($response, Response::HTTP_OK);
    }
}
